# ---------- BASE ----------
FROM node:20-alpine

 
RUN apk add --no-cache tini

WORKDIR /app

ENV NODE_ENV=production

# ---------- DEPENDENCIES ----------
COPY package.json package-lock.json ./

# deterministic install (production deps only)
RUN npm ci  

# ---------- APP FILES ----------
COPY src ./src
COPY scripts ./scripts
COPY config ./config

# ---------- SECURITY ----------
# create non-root user
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
RUN chown -R nodeuser:nodejs /app

USER nodeuser

# ---------- NETWORK ----------
EXPOSE 3000

# ---------- HEALTHCHECK ----------
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health/live').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# ---------- START ----------
ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","src/server.js"]
