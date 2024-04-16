## @bcn

# atbcn.info

La aplicación para estar al día de los eventos locales.

[atbcn.info](https://www.atbcn.info/)

![Captura de pantalla de la interfaz de usuario](https://res.cloudinary.com/getoutbcn/image/upload/v1692699599/portfolio/mockedreadme_sf5p2s.jpg)


## Características clave

- **Explora eventos:** Accede a una lista organizada de eventos de la ciudad en la semana actual y posteriores y desplázate fácilmente para descubrir lo que está sucediendo en tu área.

- **Interfaz intuitiva:** Navega por la aplicación de manera sencilla e intuitiva. Los eventos se presentan de forma apilada, lo que te permite desplazarte y explorar rápidamente la información relevante.

- **Detalles esenciales:** Cada evento muestra información clave, como el nombre, la fecha y hora, la ubicación, el precio y etiquetas descriptivas que brindan una idea general del evento.

- **Visualización completa:** Si un evento atrae tu interés, puedes hacer clic en él para acceder a una vista detallada. Allí encontrarás una descripción completa, un póster y un enlace relevante relacionado con el evento (venta de entradas o información más completa).

- **Registro simplificado:** Únete a la comunidad registrándote con tu dirección de correo electrónico y una contraseña, o simplemente utiliza la función de inicio de sesión social con Gmail para agilizar el proceso.

- **Añade tus propios eventos:** Como usuario registrado, puedes contribuir a la agenda añadiendo tus propios eventos. Rellena un formulario completo con campos como nombre, ubicación, precio y fecha para proporcionar detalles precisos.

- **Previsualización y edición:** Antes de confirmar la inclusión de un evento, puedes previsualizarlo para asegurarte de que toda la información sea correcta. Si es necesario, podrás realizar modificaciones antes de hacerlo público.

- **Protección contra mal uso:** Se ha implementado un sistema de baneo de usuarios para prevenir eventos inapropiados o engañosos. Cada evento se vincula al usuario responsable, lo que permite tomar medidas rápidas y eficaces.

- **Privacidad y seguridad:** @bcn utiliza Supabase como backend, garantizando la protección de tus datos y eliminando la necesidad de configurar tu propio servidor.
- 

## Motivación del proyecto

Con @bcn, he creado una herramienta práctica y eficiente para mantener a las personas informadas sobre los eventos locales, solventando el problema de tener toda la información dispersa en diferentes aplicaciones y sitios web. Además de ser una aplicación muy útil, este proyecto demuestra mi capacidad para moverme con documentación y aprender nuevas tecnologías experimentales, como la app folder de las versiones de Next.js posteriores a 13.2, los React Server Components y la integración con Supabase.

Este proyecto también destaca mi habilidad para crear una interfaz de usuario intuitiva y receptiva, así como nuestro enfoque en la calidad y la seguridad de los datos. @bcn es más que una simple agenda de eventos; es un testimonio de mi experiencia en desarrollo web y mi capacidad para entregar proyectos funcionales y orientados al usuario.


## Mejora integral (Febrero 2024)

Tras unos meses funcionando una primera versión de la app, y siendo de gran utilidad para gran cantidad de usuarios, se procede a realizar una mejora integral que ha consistido en:

- **Cambio de idioma:** Adaptación al idioma local (catalán).
  
- **Mejora de diseño:** Integración de imágenes de cada evento como fondo al abrir su cuadro de diálogo, otorgándole una sensación mucho más integrada.
  
- **Funcionalidad de copiar evento:** Añadir la posibilidad, clicando en un botón, de copiar la información de cada evento en el portapapeles para poder compartirla, como algunos usuarios habían pedido.
  
- **Integración de shacdn:** Librería de componentes que se integra perfectamente con Next.js otorgándole una mayor robustez y mejor look&feel.
  
- **Mejora de la UX:** Con indicadores de carga en botones como login, etc.
  
- **Actualización de tecnologías:** Migración a la última versión de Next.js (14) y migración del cliente de Supabase a `@supabase/ssr` tal y como recomiendan desde Supabase.
  
- **Cumplimiento de estándares de Google:** Añadir condiciones de servicio y política de privacidad para cumplir los estándares requeridos por Google para poder usar el Google OAuth (Login social).
  
- **Pruebas de unidad:** Añadir pruebas unitarias con Jest.
  
- **Pruebas de integración:** Añadir pruebas de integración con Jest.
  
- **Pruebas end-to-end:** Añadir pruebas e2e con Cypress.

Una vez realizada esta mejora integral, se continúan realizando mejoras como la mejora de la UX/UI de la visualización de los eventos, etc.




## Créditos

Este proyecto fue desarrollado por [Pablo](https://www.pablodelbarrio.es/).

## Licencia

Este proyecto se encuentra bajo la licencia [MIT](LICENSE).

## Todo list

- [x] Installed shadcn/ui library
- [x] Implement dark mode
- [x] Connected to Supabase
- [x] Created basic structure
- [x] Create modal to see event info
- [x] Add button to copy event information
- [x] Migrate to the new @supabase/ssr package
- [x] Add form to create events
- [x] Add authentication and social login
- [x] Add terms of service and privacy policy in order to use google oauth
- [x] Add middleware
- [x] Restriction of event insertion to users based on their e-mail address
- [x] Add unit testing with jest
- [x] Add e2e testing with Cypress
- [x] Fixed styles of background image in Dialog of the Event Info
- [x] Added zoomin onclick in the poster of each Modal info
- [x] Implement PWA functionality 
- [x] Implement Add to Google Calendar 
- [ ] Improve PWA functionality as it is not very stable 
- [ ] Add a dropdown with the locations that is also a link to the location on google maps



### Figma prototype

https://www.figma.com/file/b4la60niKI0JaT5pwKvnwJ/%40bcn?node-id=0-1&t=xD9a7fB6oTqLQZIe-0
