import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)

import { MantineReactTable, MRT_ColumnDef, MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState, useMantineReactTable } from "mantine-react-table";
import { useEffect, useMemo, useState } from 'react';
import { baseUrl } from '../config';

type UserApiResponse = {
  users: Array<User>;
    totalResults:  number;
  };
  
  type User = {
    firstName: string;
    lastName: string;
    emailAddress: string;
  };

function Users() {

    const [data, setData] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
          if (!data.length) {
            setIsLoading(true);
          } else {
            setIsRefetching(true);
          }
    
          const url = new URL(
            `/users`,
            baseUrl,
          );
          url.searchParams.set(
            'start',
            `${pagination.pageIndex * pagination.pageSize}`,
          );
          url.searchParams.set('size', `${pagination.pageSize}`);
          url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
          url.searchParams.set('globalFilter', globalFilter ?? '');
          url.searchParams.set('sorting', JSON.stringify(sorting ?? []));
    
          try {
            const response = await fetch(url.href);
            const json = (await response.json()) as UserApiResponse;
            setData(json.users);
            setRowCount(json.totalResults);
          } catch (error) {
            setIsError(true);
            console.error(error);
            return;
          }
          setIsError(false);
          setIsLoading(false);
          setIsRefetching(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [
        columnFilters, //refetch when column filters change
        globalFilter, //refetch when global filter changes
        pagination.pageIndex, //refetch when page index changes
        pagination.pageSize, //refetch when page size changes
        sorting, //refetch when sorting changes
      ]);
    
      const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
          {
            accessorKey: 'firstName',
            header: 'First Name',
          },
    
          {
            accessorKey: 'lastName',
            header: 'Last Name',
          },
          {
            accessorKey: 'emailAddress',
            header: 'Email',
          }
        ],
        [],
      );
    
      const table = useMantineReactTable({
        columns,
        data,
        enableRowSelection: true,
        getRowId: (row) => row.emailAddress,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        rowCount,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting,
        },
        mantineToolbarAlertBannerProps: isError
          ? { color: 'red', children: 'Error loading data' }
          : undefined,
      });
    
      return <MantineReactTable table={table} />;
}

export default Users;
