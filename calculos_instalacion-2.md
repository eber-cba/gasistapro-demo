# Documentación de Tablas de Gas Natural

A continuación se incluyen ambas tablas (Tabla Nº3 y Tabla Nº18) en formato JSON y se describen los requerimientos de integración, UI/UX y cálculo.

## Requerimiento General

La aplicación debe:

- Mostrar **ambas tablas** (Tabla Nº3 y Tabla Nº18) visualmente igual a las imágenes originales.
- Permitir al usuario **ir completando valores** (longitud real, accesorios, cantidad, diámetro, etc.).
- A medida que el usuario completa campos, la app debe **calcular automáticamente**:

  - Distancia real.
  - Distancia equivalente (sumatoria de accesorios según Tabla 18).
  - Longitud total corregida.
  - Caudal disponible según Tabla 3.

- Se debe mostrar al usuario **qué cálculo se realizó**, **qué fórmula se usó** y **qué valores de la tabla (fila/columna)** fueron utilizados.
- Todo debe quedar en secciones ordenadas para fácil interpretación por otra IA que haga la refactorización.

---

## Tabla Nº3 – JSON

````json
{ "titulo": "TABLA Nº 3 - GAS NATURAL", "descripcion": "Caudal en litros de gas por hora para cañerías de diferentes diámetros y longitudes. Densidad 0,65. Caída de presión h = 10 mm.", "columnas": [ "Longitud (m)", "13 1/2\"", "19 3/4\"", "25 1\"", "32 1 1/4\"", "38 1 1/2\"", "51 2\"", "63 2 1/2\"", "76 3\"", "101 4\"" ], "datos": [ { "longitud_m": 2, "13": "3,580", "19": "9,895", "25": "20,260", "32": "35,695", "38": "55,835", "51": "114,615", "63": "198,330", "76": "312,851", "101": "624,217" }, { "longitud_m": 3, "13": "2,925", "19": "8,065", "25": "16,540", "32": "28,900", "38": "45,585", "51": "93,580", "63": "161,915", "76": "255,411", "101": "524,304" }, { "longitud_m": 4, "13": "2,535", "19": "6,985", "25": "14,325", "32": "25,080", "38": "39,480", "51": "81,050", "63": "140,219", "76": "221,186", "101": "454,046" }, { "longitud_m": 5, "13": "2,265", "19": "6,250", "25": "12,810", "32": "22,685", "38": "35,310", "51": "72,490", "63": "125,419", "76": "197,840", "101": "406,125" }, { "longitud_m": 6, "13": "2,070", "19": "5,705", "25": "11,695", "32": "20,435", "38": "32,230", "51": "66,165", "63": "114,511", "76": "180,634", "101": "370,802" }, { "longitud_m": 7, "13": "1,915", "19": "5,280", "25": "10,835", "32": "18,920", "38": "29,845", "51": "61,265", "63": "106,025", "76": "167,250", "101": "343,325" }, { "longitud_m": 8, "13": "1,790", "19": "4,940", "25": "10,130", "32": "17,695", "38": "27,910", "51": "57,295", "63": "99,165", "76": "156,425", "101": "321,108" }, { "longitud_m": 9, "13": "1,690", "19": "4,655", "25": "9,550", "32": "16,685", "38": "26,320", "51": "54,025", "63": "93,479", "76": "147,457", "101": "302,698" }, { "longitud_m": 10, "13": "1,600", "19": "4,420", "25": "9,060", "32": "15,825", "38": "24,965", "51": "51,245", "63": "88,689", "76": "139,903", "101": "287,189" }, { "longitud_m": 12, "13": "1,460", "19": "4,035", "25": "8,270", "32": "14,450", "38": "22,790", "51": "46,790", "63": "80,957", "76": "127,705", "101": "282,151" }, { "longitud_m": 14, "13": "1,355", "19": "3,735", "25": "7,655", "32": "13,375", "38": "21,100", "51": "43,315", "63": "74,963", "76": "118,249", "101": "242,740" }, { "longitud_m": 16, "13": "1,265", "19": "3,495", "25": "7,160", "32": "12,510", "38": "19,595", "51": "40,515", "63": "70,109", "76": "110,593", "101": "227,024" }, { "longitud_m": 18, "13": "1,195", "19": "3,290", "25": "6,750", "32": "11,795", "38": "18,605", "51": "38,190", "63": "66,110", "76": "104,283", "101": "214,071" }, { "longitud_m": 20, "13": "1,130", "19": "3,125", "25": "6,405", "32": "11,190", "38": "17,655", "51": "36,240", "63": "62,709", "76": "98,919", "101": "203,062" }, { "longitud_m": 22, "13": "1,080", "19": "2,980", "25": "6,105", "32": "10,670", "38": "16,830", "51": "34,550", "63": "59,794", "76": "94,322", "101": "190,784" }, { "longitud_m": 24, "13": "1,035", "19": "2,850", "25": "5,845", "32": "10,215", "38": "16,110", "51": "33,060", "63": "57,244", "76": "90,298", "101": "185,363" }, { "longitud_m": 26, "13": "990", "19": "2,740", "25": "5,620", "32": "9,815", "38": "15,485", "51": "31,785", "63": "54,991", "76": "86,690", "101": "178,092" }, { "longitud_m": 28, "13": "960", "19": "2,640", "25": "5,415", "32": "9,460", "38": "14,920", "51": "30,630", "63": "53,002", "76": "83,608", "101": "174,449" }, { "longitud_m": 30, "13": "925", "19": "2,550", "25": "5,230", "32": "9,135", "38": "14,100", "51": "29,580", "63": "51,202", "76": "80,768", "101": "165,800" }, { "longitud_m": 200, "13": "360", "19": "990", "25": "2,025", "32": "3,540", "38": "5,580", "51": "11,460", "63": "19,830", "76": "31,230", "101": "64,217" } ] }```

---

## Tabla Nº18 – JSON

```json
{
  "titulo": "TABLA Nº 18 - GAS NATURAL",
  "descripcion": "Longitudes equivalentes de accesorios a rosca, expresadas en metros de cañería.",
  "diametros": ["0,013", "0,019", "0,025", "0,032", "0,038", "0,051", "0,063", "0,076", "0,101"],
  "diametros_pulgadas": ["1/2\"", "3/4\"", "1\"", "1 1/4\"", "1 1/2\"", "2\"", "2 1/2\"", "3\"", "4\""],
  "datos": [
    {
      "accesorio": "CODO 90°",
      "diam": 30,
      "cant": 1,
      "valores": { "0,013": "0.39", "0,019": "0.57", "0,025": "0.75", "0,032": "0.96", "0,038": "1.14", "0,051": "1.53", "0,063": "1.89", "0,076": "2.28", "0,101": "3.03" }
    },
    {
      "accesorio": "CODO 90°",
      "diam": 30,
      "cant": 2,
      "valores": { "0,013": "0.78", "0,019": "1.14", "0,025": "1.50", "0,032": "1.92", "0,038": "2.28", "0,051": "3.06", "0,063": "3.78", "0,076": "4.56", "0,101": "5.06" }
    },
    {
      "accesorio": "CODO 90°",
      "diam": 30,
      "cant": 3,
      "valores": { "0,013": "1.17", "0,019": "1.71", "0,025": "2.25", "0,032": "2.88", "0,038": "3.42", "0,051": "4.59", "0,063": "5.67", "0,076": "6.84", "0,101": "9.09" }
    },
    {
      "accesorio": "CODO 90°",
      "diam": 30,
      "cant": 4,
      "valores": { "0,013": "1.56", "0,019": "2.28", "0,025": "3.00", "0,032": "3.84", "0,038": "4.56", "0,051": "6.12", "0,063": "7.56", "0,076": "9.12", "0,101": "12.12" }
    },
    {
      "accesorio": "CODO 90°",
      "diam": 30,
      "cant": 5,
      "valores": { "0,013": "1.95", "0,019": "2.85", "0,025": "3.75", "0,032": "4.80", "0,038": "5.70", "0,051": "7.87", "0,063": "9.45", "0,076": "11.40", "0,101": "16.15" }
    },

    {
      "accesorio": "CODO 45°",
      "diam": 14,
      "cant": 1,
      "valores": { "0,013": "0.18", "0,019": "0.26", "0,025": "0.35", "0,032": "0.45", "0,038": "0.53", "0,051": "0.71", "0,063": "0.88", "0,076": "1.06", "0,101": "1.41" }
    },
    {
      "accesorio": "CODO 45°",
      "diam": 14,
      "cant": 2,
      "valores": { "0,013": "0.36", "0,019": "0.53", "0,025": "0.70", "0,032": "0.90", "0,038": "1.06", "0,051": "1.42", "0,063": "1.77", "0,076": "2.13", "0,101": "2.83" }
    },
    {
      "accesorio": "CODO 45°",
      "diam": 14,
      "cant": 3,
      "valores": { "0,013": "0.54", "0,019": "0.79", "0,025": "1.05", "0,032": "1.34", "0,038": "1.59", "0,051": "2.14", "0,063": "2.65", "0,076": "3.19", "0,101": "4.24" }
    },
    {
      "accesorio": "CODO 45°",
      "diam": 14,
      "cant": 4,
      "valores": { "0,013": "0.72", "0,019": "1.06", "0,025": "1.40", "0,032": "1.79", "0,038": "2.12", "0,051": "2.85", "0,063": "3.43", "0,076": "4.26", "0,101": "5.86" }
    },
    {
      "accesorio": "CODO 45°",
      "diam": 14,
      "cant": 5,
      "valores": { "0,013": "0.91", "0,019": "1.33", "0,025": "1.75", "0,032": "2.24", "0,038": "2.66", "0,051": "3.57", "0,063": "4.41", "0,076": "5.32", "0,101": "7.07" }
    },

    {
      "accesorio": "TE FLUJO TRAVÉS",
      "diam": 20,
      "cant": 1,
      "valores": { "0,013": "0.26", "0,019": "0.38", "0,025": "0.50", "0,032": "0.64", "0,038": "0.76", "0,051": "1.02", "0,063": "1.26", "0,076": "1.52", "0,101": "2.02" }
    },
    {
      "accesorio": "TE FLUJO TRAVÉS",
      "diam": 20,
      "cant": 2,
      "valores": { "0,013": "0.52", "0,019": "0.76", "0,025": "1.00", "0,032": "1.28", "0,038": "1.52", "0,051": "2.04", "0,063": "2.52", "0,076": "3.04", "0,101": "4.04" }
    },
    {
      "accesorio": "TE FLUJO TRAVÉS",
      "diam": 20,
      "cant": 3,
      "valores": { "0,013": "0.78", "0,019": "1.14", "0,025": "1.50", "0,032": "1.92", "0,038": "2.28", "0,051": "3.06", "0,063": "3.78", "0,076": "4.56", "0,101": "6.06" }
    },
    {
      "accesorio": "TE FLUJO TRAVÉS",
      "diam": 20,
      "cant": 4,
      "valores": { "0,013": "1.04", "0,019": "1.52", "0,025": "2.00", "0,032": "2.56", "0,038": "3.04", "0,051": "4.08", "0,063": "5.04", "0,076": "6.08", "0,101": "8.08" }
    },
    {
      "accesorio": "TE FLUJO TRAVÉS",
      "diam": 20,
      "cant": 5,
      "valores": { "0,013": "1.30", "0,019": "1.90", "0,025": "2.50", "0,032": "3.20", "0,038": "3.80", "0,051": "5.10", "0,063": "6.30", "0,076": "7.60", "0,101": "10.10" }
    },

    {
      "accesorio": "TE FLUJO 90°",
      "diam": 60,
      "cant": 1,
      "valores": { "0,013": "0.78", "0,019": "1.14", "0,025": "1.50", "0,032": "1.92", "0,038": "2.28", "0,051": "3.06", "0,063": "3.78", "0,076": "4.56", "0,101": "6.06" }
    },
    {
      "accesorio": "TE FLUJO 90°",
      "diam": 60,
      "cant": 2,
      "valores": { "0,013": "1.56", "0,019": "2.28", "0,025": "3.00", "0,032": "3.84", "0,038": "4.56", "0,051": "6.12", "0,063": "7.56", "0,076": "9.12", "0,101": "12.12" }
    },
    {
      "accesorio": "TE FLUJO 90°",
      "diam": 60,
      "cant": 3,
      "valores": { "0,013": "2.34", "0,019": "3.42", "0,025": "4.50", "0,032": "5.76", "0,038": "6.84", "0,051": "9.18", "0,063": "11.34", "0,076": "13.68", "0,101": "18.18" }
    },
    {
      "accesorio": "TE FLUJO 90°",
      "diam": 60,
      "cant": 4,
      "valores": { "0,013": "3.12", "0,019": "4.56", "0,025": "6.00", "0,032": "7.68", "0,038": "9.12", "0,051": "12.24", "0,063": "15.12", "0,076": "18.24", "0,101": "24.24" }
    },
    {
      "accesorio": "TE FLUJO 90°",
      "diam": 60,
      "cant": 5,
      "valores": { "0,013": "3.90", "0,019": "5.70", "0,025": "7.50", "0,032": "9.60", "0,038": "11.40", "0,051": "15.30", "0,063": "18.90", "0,076": "22.80", "0,101": "30.30" }
    },

    {
      "accesorio": "LLAVE MACHO",
      "diam": 100,
      "cant": 1,
      "valores": { "0,013": "1.30", "0,019": "1.90", "0,025": "2.50", "0,032": "3.20", "0,038": "3.80", "0,051": "5.10", "0,063": "6.30", "0,076": "7.60", "0,101": "10.10" }
    },
    {
      "accesorio": "LLAVE MACHO",
      "diam": 100,
      "cant": 2,
      "valores": { "0,013": "2.60", "0,019": "3.80", "0,025": "5.00", "0,032": "6.40", "0,038": "7.60", "0,051": "10.20", "0,063": "12.60", "0,076": "15.20", "0,101": "20.20" }
    },
    {
      "accesorio": "LLAVE MACHO",
      "diam": 100,
      "cant": 3,
      "valores": { "0,013": "3.90", "0,019": "5.70", "0,025": "7.50", "0,032": "9.60", "0,038": "11.40", "0,051": "15.30", "0,063": "18.90", "0,076": "22.80", "0,101": "30.30" }
    },
    {
      "accesorio": "LLAVE MACHO",
      "diam": 100,
      "cant": 4,
      "valores": { "0,013": "5.20", "0,019": "7.60", "0,025": "10.00", "0,032": "12.80", "0,038": "15.20", "0,051": "20.40", "0,063": "25.20", "0,076": "30.40", "0,101": "40.40" }
    },
    {
      "accesorio": "LLAVE MACHO",
      "diam": 100,
      "cant": 5,
      "valores": { "0,013": "6.50", "0,019": "9.50", "0,025": "12.50", "0,032": "16.00", "0,038": "19.00", "0,051": "25.50", "0,063": "31.50", "0,076": "38.00", "0,101": "50.50" }
    }
  ]
}

````

---

## Renderizado en Tabla (UI/UX)

La interfaz debe renderizar ambas tablas en estilo grid idéntico a las imágenes:

- Columnas de diámetros ordenadas de menor a mayor.
- Filas con longitudes (Tabla 3) y filas con accesorios (Tabla 18).
- Celdas coloreadas opcionalmente para diferenciar rangos (opcional).

### Reglas de diseño

- Las tablas deben verse completas sin scroll horizontal cuando sea posible.
- Valores deben permitir hover para mostrar tooltip:
  "Este valor proviene de la tabla Nº3/18 en la fila X y columna Y".
- El usuario podrá seleccionar:

  - Longitud del tramo.
  - Tipo de cañería.
  - Accesorios.
  - Diámetros.

- Debe existir un panel lateral que muestre **los cálculos paso a paso**.

---

## Fórmulas que deben implementarse

### 1. Distancia Real

La distancia real se toma directamente desde el input del usuario.

```
DistanciaReal = ValorIngresadoPorUsuario
```

### 2. Distancia Equivalente por Accesorios (Tabla 18)

Cada accesorio aporta una longitud equivalente según:

```
LongitudAccesorio = valor_tabla_18(diametro, accesorio, cantidad)
```

Luego se suman todos los accesorios del tramo:

```
DistanciaEquivalente = Σ(LongitudAccesorio)
```

### 3. Longitud Total Corregida

```
LongitudTotal = DistanciaReal + DistanciaEquivalente
```

### 4. Lectura de Caudal (Tabla 3)

Para un diámetro y una longitud total, se usa interpolación o selección directa:

```
Caudal = Tabla3[longitud_redondeada][diametro]
```

Si la longitud no existe exactamente, la app debe interpolar entre las filas.

---

## Cálculo Visible para el Usuario

Cuando la app muestre resultados debe indicar:

- **De dónde salió el valor**, por ejemplo:

  - "Se usó la fila '14 m' de la Tabla Nº3 y la columna '1 1/2"'."
  - "El valor equivalente del accesorio 'Codo 45°' viene de la Tabla Nº18, fila 'Cant. 3', columna '1"'."

- **Qué fórmula se aplicó**, por ejemplo:

```
DistanciaEquivalente = 0.72 + 1.06 + 2.14 = 3.92 m
LongitudTotal = 18 + 3.92 = 21.92 m
```

- **Qué resultado final se obtuvo**.

---

## Módulo de Cálculo

La IA que refactorice debe implementar un módulo:

- `calcularDistanciaEquivalente(accesorios[])`
- `calcularLongitudTotal(real, equivalente)`
- `obtenerCaudal(longitud, diametro)` buscado en Tabla 3
- `mostrarExplicacionPasoAPaso()`

---

## Tests necesarios

La IA debe generar tests para validar:

- Carga correcta de ambas tablas.
- Cálculo correcto de equivalencias.
- Interpolación de longitud en Tabla 3.
- Selección correcta de diámetro y accesorios.
- Renderizado UX de las tablas.

---

## Instrucciones para la IA que refactoriza

1. Utilizar los dos JSON EXACTOS provistos arriba.
2. Mantener nombres de propiedades sin modificarlos.
3. Construir una UI donde cada tabla se muestre igual a las imágenes.
4. Vincular inputs del usuario con las fórmulas mostradas.
5. Mostrar cálculos en tiempo real.
6. Explicar cada paso de forma clara dentro de un panel informativo.
7. Generar componentes reutilizables.
8. Implementar tests automáticos.

---

Fin del documento.
