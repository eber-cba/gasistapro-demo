# GasistaPro – Demo

Calcula automáticamente si un diámetro de caño es apto para la potencia total instalada y la longitud del tramo. Basado en tabla técnica (libro). También sugiere el diámetro mínimo cuando el seleccionado no alcanza. Incluye mini-plano para ilustrar la ubicación del artefacto.

## Para el papá (breve explicación)

1. Ingresás la potencia total (kcal/h) de los artefactos.
2. Indicás la longitud del tramo (m).
3. Seleccionás el diámetro de caño que pensás usar.
4. La app te dice si ese caño soporta la potencia y te recomienda otro diámetro si no.
5. Además podés dibujar un plano del recorrido y guardar la imagen.

## Para el técnico / desarrollador (qué se calcula y en base a qué)

Se calcula la potencia máxima admisible para el diámetro seleccionado en función de la longitud usando la tabla técnica (potencia_max).

Si la longitud no aparece exactamente en la tabla, se hace una interpolación lineal entre los dos puntos más cercanos.

Comparación simple: potenciaTotal ≤ potencia_max → aprobado. Si no, se busca el siguiente diámetro mayor que cumpla la condición.

## Deploy (Vercel / Netlify)

### Vercel

1. Crear cuenta en vercel.com e instalar Vercel CLI (opcional).
2. Con push al repo en GitHub, en Vercel elegir "Import Project" -> seleccionar el repo.
3. Build command: `npm run build`
4. Output directory: `dist` (Vite generates dist).
5. Environment: no required env for demo.
6. Click Deploy. Vercel hace deploy y da URL.

Para updates: push a main o a la rama que tengas configurada.

### Netlify

1. Crear cuenta en netlify.com.
2. "New site from Git" -> conectar GitHub -> seleccionar repo.
3. Build command: `npm run build`, publish dir: `dist`.
4. Deploy site. Netlify crea URL.

Para cambios: push y Netlify redeploy automáticamente.
