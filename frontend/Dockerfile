

FROM node:20

WORKDIR /app
ARG NEXT_PUBLIC_BASE_URL=http://backend:8000
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

COPY . .
RUN rm -r /app/src/
EXPOSE 3000

CMD ["npm", "start"]

