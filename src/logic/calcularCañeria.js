
function interp(x, x0, x1, y0, y1) {
  if (x1 === x0) return y0;
  const t = (x - x0) / (x1 - x0);
  return y0 + t * (y1 - y0);
}

export function evaluarCañeria(tabla, potenciaTotal, longitud, diametroSeleccionado) {
  const diametroData = tabla.find(d => d.diametro === diametroSeleccionado);

  if (!diametroData) {
    return {
      aprobado: false,
      mensaje: "Diámetro no encontrado en la tabla.",
    };
  }

  let potencia_max;
  const longitudes = diametroData.longitudes;
  const exacta = longitudes.find(l => l.metros === longitud);

  if (exacta) {
    potencia_max = exacta.potencia_max;
  } else {
    let lower = null;
    let upper = null;

    for (const l of longitudes) {
      if (l.metros < longitud && (!lower || l.metros > lower.metros)) {
        lower = l;
      }
      if (l.metros > longitud && (!upper || l.metros < upper.metros)) {
        upper = l;
      }
    }

    if (lower && upper) {
      potencia_max = interp(longitud, lower.metros, upper.metros, lower.potencia_max, upper.potencia_max);
    } else if (lower) {
        potencia_max = lower.potencia_max; // Extrapolate or use closest
    } else if (upper) {
        potencia_max = upper.potencia_max; // Extrapolate or use closest
    }
     else {
       return {
        aprobado: false,
        mensaje: "No se pudo determinar la potencia máxima para la longitud especificada.",
      };
    }
  }

  const aprobado = potenciaTotal <= potencia_max;
  let diametro_recomendado = null;
  let mensaje = '';

  if (aprobado) {
    mensaje = `Aprobado para ${diametroSeleccionado}" con material ${diametroData.material_recomendado}.`;
  } else {
    mensaje = `Potencia supera el límite para ${diametroSeleccionado}".`;
    const currentIndex = tabla.findIndex(d => d.diametro === diametroSeleccionado);
    for (let i = currentIndex + 1; i < tabla.length; i++) {
      const siguienteDiametroData = tabla[i];
      // Recalculate potencia_max for the new diameter
      let siguiente_potencia_max;
      const siguiente_longitudes = siguienteDiametroData.longitudes;
      const siguiente_exacta = siguiente_longitudes.find(l => l.metros === longitud);
      if(siguiente_exacta){
        siguiente_potencia_max = siguiente_exacta.potencia_max;
      } else {
        let lower = null;
        let upper = null;
        for (const l of siguiente_longitudes) {
            if (l.metros < longitud && (!lower || l.metros > lower.metros)) {
                lower = l;
            }
            if (l.metros > longitud && (!upper || l.metros < upper.metros)) {
                upper = l;
            }
        }
        if(lower && upper) {
            siguiente_potencia_max = interp(longitud, lower.metros, upper.metros, lower.potencia_max, upper.potencia_max);
        } else if(lower){
            siguiente_potencia_max = lower.potencia_max;
        } else if(upper){
            siguiente_potencia_max = upper.potencia_max;
        }
      }

      if (potenciaTotal <= siguiente_potencia_max) {
        diametro_recomendado = siguienteDiametroData.diametro;
        mensaje += ` Se recomienda usar ${diametro_recomendado}".`;
        break;
      }
    }
    if(!diametro_recomendado){
        mensaje += ' No se encontró un diámetro adecuado en la tabla.'
    }
  }

  return {
    aprobado,
    potencia_max,
    diametro_recomendado,
    material_recomendado: diametroData.material_recomendado,
    uso_provisorio: diametroData.uso_provisorio_max,
    mensaje,
  };
}
