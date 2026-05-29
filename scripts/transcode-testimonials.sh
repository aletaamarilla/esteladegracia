#!/usr/bin/env bash
set -euo pipefail

INDIVIDUAL_DIR="testimonios/TESTIMONIOS"
GROUP_DIR="testimonios/TESTIMONIOS/sesiones-grupales"
OUT_DIR="testimonios/compressed"

mkdir -p "$OUT_DIR"

transcode() {
  local input="$1"
  local basename
  basename="$(basename "$input")"
  local output_name="${basename%.*}.mp4"
  local output="$OUT_DIR/$output_name"

  if [[ -f "$output" ]]; then
    echo "⏭  Skipping (already exists): $output_name"
    return
  fi

  local size_before
  size_before=$(du -h "$input" | cut -f1)
  echo "🎬 Transcoding: $basename ($size_before)"

  ffmpeg -y -i "$input" \
    -c:v libx264 -crf 28 -preset slow \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "$output" 2>/dev/null

  local size_after
  size_after=$(du -h "$output" | cut -f1)
  echo "   ✅ Done: $output_name  ($size_before → $size_after)"
}

echo "=== Transcoding individual testimonials ==="
for f in "$INDIVIDUAL_DIR"/*.{mp4,MP4,mov,MOV} 2>/dev/null; do
  [[ -f "$f" ]] || continue
  # Skip files inside the subdirectory
  [[ "$(dirname "$f")" == "$INDIVIDUAL_DIR" ]] || continue
  transcode "$f"
done

echo ""
echo "=== Transcoding group testimonials ==="
for f in "$GROUP_DIR"/*.{mp4,MP4,mov,MOV} 2>/dev/null; do
  [[ -f "$f" ]] || continue
  transcode "$f"
done

echo ""
echo "=== Summary ==="
echo "Output directory: $OUT_DIR"
du -sh "$OUT_DIR"
echo ""
echo "Individual files:"
ls -lhS "$OUT_DIR"/*.mp4 2>/dev/null || echo "  (none)"

# Check for files still over 25MB and re-encode with higher CRF
echo ""
echo "=== Checking for oversized files (>25MB) ==="
for f in "$OUT_DIR"/*.mp4; do
  [[ -f "$f" ]] || continue
  size_bytes=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null)
  if (( size_bytes > 26214400 )); then
    fname="$(basename "$f")"
    echo "⚠️  $fname is $(du -h "$f" | cut -f1), re-encoding with -crf 32..."
    tmp="${f}.tmp.mp4"
    ffmpeg -y -i "$f" \
      -c:v libx264 -crf 32 -preset slow \
      -c:a aac -b:a 96k \
      -movflags +faststart \
      "$tmp" 2>/dev/null
    mv "$tmp" "$f"
    echo "   ✅ Re-encoded: $(du -h "$f" | cut -f1)"
  fi
done

echo ""
echo "🎉 All done! Total size:"
du -sh "$OUT_DIR"
