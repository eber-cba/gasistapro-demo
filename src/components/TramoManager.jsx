import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaRuler } from "react-icons/fa";
import useStore from "../hooks/useStore";
import SelectorArtefactos from "../modules/ui/selectorArtefactos";
import SelectorAccesorios from "../modules/ui/selectorAccesorios";

const TramoManager = () => {
  const {
    tramos,
    addTramo,
    removeTramo,
    updateTramo,
    addArtifactToTramo,
    removeArtifactFromTramo,
    addAccesorio, // We might need to adjust this if SelectorAccesorios passes full list
    updateAccesorio, // Not used directly if we replace list
    removeAccesorio, // Not used directly if we replace list
  } = useStore();

  // Helper to update accessories list for a tramo
  // Since SelectorAccesorios returns the full list of accessories with quantities,
  // we need to sync this with the store.
  // The store currently has add/update/remove actions for individual accessories.
  // But SelectorAccesorios gives us a new list.
  // We can either update the store to accept a full list, or we can diff here.
  // Updating the store to accept a full list is cleaner.
  // Let's assume we can update the store to accept a full list or we implement a helper here.
  // Actually, let's update the store to have `setAccesoriosForTramo`.
  // For now, let's implement a helper in the store or here.
  // Wait, I can't easily update the store again without another tool call.
  // I'll implement a helper here to sync.
  // Actually, looking at useStore, `accesorios` is an array of {id, tipo, cantidad}.
  // SelectorAccesorios returns array of {tipo, diametro, cantidad}.
  // It doesn't have IDs.
  // So we should probably replace the list in the store.
  // But the store expects IDs.
  // Let's modify the store to allow setting the whole list of accessories, generating IDs if needed.
  // Or simpler: just use the list from SelectorAccesorios as the source of truth and update the store.
  
  // Let's check useStore again. It has `accesorios: []`.
  // I'll add `setAccesorios` to useStore in the next step if needed, but for now let's try to use what we have.
  // Actually, I can just use `updateTramo(tramoId, 'accesorios', newAccesorios)`!
  // `updateTramo` updates a field.
  // `tramos` is array of objects.
  // `updateTramo` does: `t.id === tramoId ? { ...t, [field]: value } : t`
  // So yes, I can just pass the new list of accessories!
  // But I need to make sure they have IDs if the store logic elsewhere relies on IDs.
  // The calculation logic doesn't seem to rely on IDs for accessories, just tipo and quantity.
  // The store actions `updateAccesorio` use ID.
  // If I replace the list, I should probably generate IDs or just not worry if I don't use individual update actions anymore.
  
  const handleAccesoriosChange = (tramoId, newAccesorios) => {
    // Ensure they have IDs if missing (though not strictly needed for calculation)
    const accessoriesWithIds = newAccesorios.map(a => ({
      ...a,
      id: a.id || Date.now() + Math.random().toString()
    }));
    updateTramo(tramoId, "accesorios", accessoriesWithIds);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
      <AnimatePresence>
        {tramos.map((tramo, index) => (
          <motion.div
            key={tramo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--spacing-6)",
              boxShadow: "var(--shadow-md)",
              border: "1px solid var(--border-light)",
              position: "relative",
            }}
          >
            {/* Tramo Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "var(--spacing-6)",
                borderBottom: "2px solid var(--border-light)",
                paddingBottom: "var(--spacing-4)",
              }}
            >
              <h2
                style={{
                  fontSize: "var(--font-size-2xl)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--primary-color)",
                  margin: 0,
                }}
              >
                {tramo.name}
              </h2>
              {tramos.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeTramo(tramo.id)}
                  className="btn-danger btn-icon"
                  title="Eliminar Tramo"
                  style={{
                    padding: "var(--spacing-2)",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  <FaTrash />
                </motion.button>
              )}
            </div>

            {/* Distancia Real Input */}
            <div className="card" style={{ marginBottom: "var(--spacing-6)", background: "var(--bg-secondary)" }}>
              <label
                htmlFor={`distancia-${tramo.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-2)",
                  marginBottom: "var(--spacing-2)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--text-primary)",
                  fontSize: "var(--font-size-lg)",
                }}
              >
                <FaRuler /> Distancia Real (metros):
              </label>
              <input
                type="number"
                id={`distancia-${tramo.id}`}
                value={tramo.distancia_real}
                onChange={(e) => updateTramo(tramo.id, "distancia_real", e.target.value)}
                placeholder="Ej: 15.5"
                step="0.01"
                min="0"
                style={{
                  width: "100%",
                  padding: "var(--spacing-3)",
                  fontSize: "var(--font-size-lg)",
                  borderRadius: "var(--radius-md)",
                  border: "2px solid var(--border-color)",
                }}
              />
            </div>

            {/* Selectors */}
            <div className="responsive-grid" style={{ display: "grid", gap: "var(--spacing-6)" }}>
              <SelectorArtefactos
                selectedArtifacts={tramo.artifacts}
                onAddArtifact={(artifact) => addArtifactToTramo(tramo.id, artifact)}
                onRemoveArtifact={(artifactId) => removeArtifactFromTramo(tramo.id, artifactId)}
              />
              
              <SelectorAccesorios
                accesorios={tramo.accesorios}
                onAccesorioChange={(newAccesorios) => handleAccesoriosChange(tramo.id, newAccesorios)}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Tramo Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={addTramo}
        className="btn-secondary"
        style={{
          alignSelf: "center",
          padding: "var(--spacing-4) var(--spacing-8)",
          fontSize: "var(--font-size-lg)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <FaPlus /> Agregar Nuevo Tramo
      </motion.button>
    </div>
  );
};

export default TramoManager;
