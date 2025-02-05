import React, { ReactNode } from "react";
import {
    Table as NextUITable,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    SortDescriptor,
} from "@nextui-org/table";
import "./Table.css";
import page, {
    statusOptions,
    SearchIcon,
    ChevronDownIcon,
    PlusIcon,
} from "@/app/page";

import { Input } from "@nextui-org/input";

export function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

interface TableProps {
    rows: Array<{
        key: number | string;
        email?: string;
        name?: string;
        role?: string;
    }>;
    columns: Array<{
        key: string;
        label: string;
        sortable?: boolean;
    }>;
    emptyContent?: string;
    actionElements?: (row: TableProps["rows"][0]) => ReactNode;
}

function Table({
    rows,
    columns,
    emptyContent = "No rows to display",
    actionElements,
}: TableProps) {
    const [filterValue, setFilterValue] = React.useState("");
    const hasSearchFilter = Boolean(filterValue);

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: columns[0].key,
        direction: "ascending",
    });

    const sortedAndFilteredItems = React.useMemo(() => {
        // Filter rows based on search
        const filtered = hasSearchFilter
            ? rows.filter((row) =>
                  columns.some((column) => {
                      const cellValue = row[column.key as keyof typeof row];
                      return cellValue
                          ?.toString()
                          .toLowerCase()
                          .includes(filterValue.toLowerCase());
                  })
              )
            : rows;

        // Sort the filtered rows
        if (!sortDescriptor.column) return filtered;

        return filtered.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];

            if (first == null || second == null) return 0;

            const cmp =
                typeof first === "number" && typeof second === "number"
                    ? first - second
                    : String(first).localeCompare(String(second));

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [
        rows,
        hasSearchFilter,
        filterValue,
        columns,
        sortDescriptor.column,
        sortDescriptor.direction,
    ]);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            // setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        // onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
            </div>
        );
    }, [filterValue, onSearchChange]);

    const renderCell = React.useCallback(
        (row: TableProps["rows"][0], columnKey: React.Key) => {
            const cellValue = row[columnKey as keyof TableProps["rows"][0]];

            switch (columnKey) {
                case "name":
                    return <div>{cellValue}</div>;
                case "role":
                    return (
                        <div className="flex flex-col">
                            <p style={{ textTransform: "uppercase" }}>
                                {cellValue}
                            </p>
                        </div>
                    );
                case "actions":
                    return (
                        <div className="actions-row">
                            {actionElements ? actionElements(row) : null}
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [actionElements]
    );

    return (
        <NextUITable
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            aria-label="Example table with dynamic content"
            topContent={topContent}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.key}
                        align={column.key === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={sortedAndFilteredItems}
                emptyContent={emptyContent}
            >
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </NextUITable>
    );
}

export default Table;
