export const GROUP_PROGRAM = {
  navLabel: "Terapia grupal",
  eyebrow: "Terapia grupal",
  name: "Programa: Mirarte distinto",
  fullTitle: "Terapia grupal | Programa: Mirarte distinto",
  description:
    "Un proceso grupal para salir del bucle de la ansiedad, entender tus patrones y empezar a relacionarte de otra manera",
}

const GROUP_THERAPY_COPY_REGEX = /grupo terap[eé]utico/gi

export function normalizeGroupProgramText(text?: string) {
  return text?.replace(GROUP_THERAPY_COPY_REGEX, GROUP_PROGRAM.navLabel)
}

type NavLinkLike = {
  label: string
  href: string
  children?: NavLinkLike[]
}

export function normalizeGroupProgramNavLinks<T extends NavLinkLike>(links: T[] = []): T[] {
  return links.map((link) => ({
    ...link,
    label: normalizeGroupProgramText(link.label) ?? link.label,
    children: link.children ? normalizeGroupProgramNavLinks(link.children) : link.children,
  }) as T)
}
