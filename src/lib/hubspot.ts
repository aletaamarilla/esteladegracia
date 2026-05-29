export type HubSpotField = {
  objectTypeId: "0-1"
  name: string
  value: string
}

const HUBSPOT_PORTAL_ID = import.meta.env.PUBLIC_HUBSPOT_PORTAL_ID
const SUBSCRIPTION_TYPE_ID = 2013853671

const DEFAULT_CONSENT_TEXT =
  "Acepto que Esteladegracia.psi almacene y trate mis datos personales."
const DEFAULT_COMMUNICATIONS_TEXT =
  "Acepto recibir otras comunicaciones de Esteladegracia.psi."

export async function submitHubspotForm(
  formId: string,
  fields: HubSpotField[],
  consentText?: string
): Promise<void> {
  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: consentText ?? DEFAULT_CONSENT_TEXT,
            communications: [
              {
                value: true,
                subscriptionTypeId: SUBSCRIPTION_TYPE_ID,
                text: DEFAULT_COMMUNICATIONS_TEXT,
              },
            ],
          },
        },
      }),
    }
  )

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.message || "Error al enviar el formulario")
  }
}
