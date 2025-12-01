# 📐 Sistema de Cálculo de Instalaciones de Gas  
Documento técnico + UI mock para integrar en la app.

---

# 1️⃣ Ingreso de Datos del Usuario

Los siguientes campos deben aparecer como inputs visibles y claros para el usuario.

## 🧮 Datos por Tramo

| Campo                     | ID / Variable          | Tipo     | Ejemplo |
|---------------------------|-------------------------|----------|---------|
| Tramo                     | `tramo`                | texto    | Cocina – T1 |
| Distancia Real (m)        | `distancia_real`       | número   | 22.10 |
| Distancia Equivalente (m)| `distancia_equivalente`| número   | 10.93 |
| Distancia Definitiva (m) | `distancia_definitiva` | número   | auto = real + equivalente |
| Consumo (m³/h)            | `consumo_m3h`          | número   | 1.07 |
| Ø Provisorio             | `diametro_provisorio`  | texto    | ¾" |
| Ø Definitivo             | `diametro_definitivo`  | texto    | ¾" |

---

# 2️⃣ UI MOCKUP (Vista de Usuario)

## 🟦 **Tramo: Cocina – T1**

### 📏 Distancias
Distancia Real ............... 22.10 m  
Distancia Equivalente ........ 10.93 m  
Distancia Definitiva ......... 33.03 m  

### 🔥 Consumo
Consumo total ................ 1.07 m³/h

### 🔧 Selección de Diámetros
Ø Provisorio (Tabla Nº3) ..... ¾"  
Ø Definitivo (Tabla Nº3) ..... ¾"

---

## 🟦 **Tramo: Caldera – T1**

Distancia Real ............... 20.20 m  
Distancia Equivalente ........ 9.36 m  
Distancia Definitiva ......... 29.56 m  

Consumo total ................ 2.79 m³/h  

Ø Provisorio ................. ¾"  
Ø Definitivo ................. 1"

---

## 🟦 **Tramo: T1 – Medidor**

Distancia Real ............... 22.10 m  
Distancia Equivalente ........ 10.93 m  
Distancia Definitiva ......... 33.03 m  

Consumo total ................ 3.86 m³/h  

Ø Provisorio ................. 1"  
Ø Definitivo ................. 1"

---

# 3️⃣ TABLA Nº3 — Selección de Ø por Consumo y Distancia  

| Distancia (m) | 0.5 m³/h | 1.0 m³/h | 1.5 m³/h | 2.0 m³/h | 3.0 m³/h | 4.0 m³/h | 5.0 m³/h |
|--------------:|:--------:|:--------:|:--------:|:--------:|:--------:|:--------:|:--------:|
| 5             | ½"       | ½"       | ¾"       | ¾"       | 1"       | 1"       | 1¼"      |
| 10            | ½"       | ¾"       | ¾"       | 1"       | 1"       | 1¼"      | 1¼"      |
| 15            | ½"       | ¾"       | 1"       | 1"       | 1¼"      | 1¼"      | 1½"      |
| 20            | ¾"       | ¾"       | 1"       | 1¼"      | 1¼"      | 1½"      | 1½"      |
| 25            | ¾"       | 1"       | 1"       | 1¼"      | 1½"       | 1½"      | 2"       |
| 30            | ¾"       | 1"       | 1¼"      | 1¼"      | 1½"      | 2"       | 2"       |
| 35            | 1"       | 1"       | 1¼"      | 1½"      | 1½"      | 2"       | 2"       |
| 40            | 1"       | 1¼"      | 1¼"      | 1½"      | 2"       | 2"       | 2½"      |

---

# 4️⃣ JSON para Integración

```json
{
  "tramo": "",
  "distancia_real": 0,
  "distancia_equivalente": 0,
  "distancia_definitiva": 0,
  "consumo_m3h": 0,
  "diametro_provisorio": "",
  "diametro_definitivo": ""
}
```
