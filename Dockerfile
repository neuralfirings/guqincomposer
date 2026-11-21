FROM node:20-bookworm-slim

# LilyPond renders the scores; curl/openssl are handy for moving data onto the volume.
RUN apt-get update \
 && apt-get install -y --no-install-recommends lilypond fontconfig curl openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Fonts LilyPond needs for the jianzipu and Chinese text.
COPY fonts/ /usr/share/fonts/opentype/guqin/
RUN fc-cache -f

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .

CMD ["node", "app.js"]
