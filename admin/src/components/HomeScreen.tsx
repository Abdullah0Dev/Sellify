/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, Trash, PenLine, PlusSquare } from "lucide-react"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { Link, useNavigate } from "react-router"
import { usePreviewUpdater } from "../context/UpdateContext"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import { deleteProduct, getProducts, type ProductType } from "../api"
import { useAPIActions } from "../context/APIActionContext"

 

export const columns: ColumnDef<ProductType>[] = [

    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const item = row.original
            return (
                <div className=" flex items-center space-x-1.5">
                    <img src={item.images[0]} alt={item.name}
                        className="w-6 rounded-sm h-6"
                    />
                    <h3 className="capitalize"> {item.name}</h3>
                </div>
            )
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="default"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("category")}</div>,
    },
    {
        accessorKey: "price",
        header: () => "Price",
        cell: ({ row }) => {
            const item = row.original;

            const amount = item.prices[0].price

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="  font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        header: () => <div className="sm:pr-7 text-right">Actions</div>,
        // enableHiding: false,
        cell: ({ row }) => {
            // navigate to edit page
            const { setForm } = usePreviewUpdater()
            const navigate = useNavigate();
            const { dispatch } = useAPIActions();

            const item = row.original
            const handleEditProduct = () => {
                navigate(`/edit/${item._id}`)
                setForm({
                    productName: item.name,
                    category: item.category,
                    desc: item.description,
                    brand: item.brand ?? "",
                    rating: String(item.average_rating),
                    images: item.images,
                    prices: [
                        { size: "S", price: String(item.prices[0].price) },
                        { size: "M", price: String(item.prices[1].price) },
                        { size: "L", price: String(item.prices[2].price) }
                    ],
                });
            }
            const handleRemoveProduct = async () => {
                try {
                    console.log("res", item._id);
                    const res = await deleteProduct(item._id ?? "");
                    dispatch({ type: 'DELETE_PRODUCTS', payload: res })

                } catch (err) {
                    console.error("Failed to delete product:", err);
                }
            }
            return (
                <div className="sm:pr-5 transition-all justify-end flex items-center space-x-1.5">
                    <button
                        onClick={handleEditProduct}
                        className="border group transition-all hover:border-blue-500 px-1 rounded-sm"><PenLine className="w-4 group-hover:text-blue-500" /> </button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                className="border group hover:border-red-500 border-red-400 px-1 rounded-sm"><Trash className="w-4 text-red-400 group-hover:text-red-500" /> </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    Product and remove data from the servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleRemoveProduct}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            )
        },
    },
]

export function HomeScreen() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const { state, dispatch } = useAPIActions();
    const products = state.products;

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts();
                dispatch({ type: 'SET_PRODUCTS', payload: res })
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        };

        fetchProducts();
    }, [dispatch]);
    const table = useReactTable({
        data: products || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full h-full p-5">
            <div className="flex items-center w-full justify-between py-4">
                <Input
                    type="text"
                    placeholder="Filter Names..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="sm:w-md"
                />
                <Link to={`/new`} className="bg-blue-500 hover:opacity-90 rounded-md px-4 py-1 flex items-center space-x-1">
                    <PlusSquare className="w-4 text-white" />
                    <h3 className="text-sm font-semibold text-white">Create</h3>
                </Link>
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="default" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-accent">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
