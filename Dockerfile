###################### 1ª FASE — BUILD ######################
FROM node:20.12.2-alpine AS build
WORKDIR /app

# 1. deps completos (inclui react-app-rewired)
COPY package*.json ./
RUN npm ci             # NÃO defina NODE_ENV aqui

# 2. código + build
COPY . .
RUN npm run build      # gera /app/build

###################### 2ª FASE — SERVE ESTÁTICO #############
FROM node:20.12.2-alpine AS prod
RUN npm install -g serve      # ~4 MiB

WORKDIR /app
COPY --from=build /app/build ./build

ENV NODE_ENV=production
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
