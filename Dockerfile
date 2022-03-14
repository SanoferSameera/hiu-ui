FROM node:8 as build-deps
WORKDIR /app
COPY . ./
RUN npm install

ARG BACKEND_BASE_URL='https://ndhm-dev.bahmni-covid19.in'
ARG BASE_NAME='@'
ARG BACKEND_API_PATH='/hiu-api'
ARG DICOM_SERVER_PATH='/'
ARG VIEWER_PAGE='/viewer/'
ARG TITLE='NCG'
ARG TIMEZONE_OFFSET='+05:30'

ENV BACKEND_BASE_URL=${BACKEND_BASE_URL}
ENV BASE_NAME ${BASE_NAME}
ENV BACKEND_API_PATH ${BACKEND_API_PATH}
ENV DICOM_SERVER_PATH ${DICOM_SERVER_PATH}
ENV REACT_APP_SITE_TITLE=${TITLE}
ENV DICOM_VIEWER_PAGE=${VIEWER_PAGE}
ENV TIMEZONE_OFFSET=${TIMEZONE_OFFSET}
RUN npm run build

# stage: 2 ?~@~T the production environment
FROM node:13.12.0-alpine
RUN npm install -g serve
COPY --from=build-deps /app/dist/ dist/
EXPOSE 5000
CMD ["serve", "dist/", "-l",  "5000"]
