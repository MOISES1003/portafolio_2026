interface FooterModalProps {
  form: string;
  onClose: () => void;
  loading?: boolean;
}

export function FooterModal({ form, onClose, loading }: FooterModalProps) {
  return (
    <div className="flex w-full justify-end gap-3">
      
      {/* Cancelar */}
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 
                   hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
      >
        Cancelar
      </button>

      {/* Guardar */}
      <button
        form={form}
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium
                   hover:bg-blue-700 active:scale-[0.98]
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>

    </div>
  );
}