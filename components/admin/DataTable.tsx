"use client";

import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ReactNode } from "react";

interface DataTableProps<T> {
    rowData: T[];
    columnDefs: ColDef<T>[];
    loading?: boolean;
    height?: number | string;
    headerAction?: ReactNode;
}

export default function DataTable<T>({
    rowData,
    columnDefs,
    loading = false,
    height = 500,
    headerAction
}: DataTableProps<T>) {
    return (
        <div className="w-full space-y-2">
            {/* Header */}
            <div className="h-10 flex items-center justify-between px-2">
                {/* Lado izquierdo */}
                {loading ? (
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
                        Cargando datos...
                    </div>
                ) : (
                    <span className="text-sm text-zinc-500">
                        Total registros: {rowData.length}
                    </span>
                )}

                {/* Lado derecho */}
                {headerAction && (
                    <div className="flex items-center">
                        {headerAction}
                    </div>
                )}
            </div>

            {/* Table */}
            <div
                className="ag-theme-alpine w-full bg-red h-9"
                style={{ height }}
            >
                <AgGridReact<T>
                    theme="legacy"
                    rowData={rowData}
                    columnDefs={columnDefs}
                    rowSelection="single"
                    animateRows
                    overlayLoadingTemplate={`
            <span class="ag-overlay-loading-center">
              Cargando...
            </span>
          `}
                    loadingOverlayComponentParams={{
                        loadingMessage: "Cargando...",
                    }}
                />
            </div>
        </div>
    );
}
