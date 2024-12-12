// src/pages/Users.tsx
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { MantineReactTable, MRT_ColumnDef, MRT_ColumnFiltersState, MRT_SortingState, useMantineReactTable } from "mantine-react-table";
import { useContext, useEffect, useMemo, useState } from 'react';
import { baseUrl } from '../../config';
import { showNotification } from '@mantine/notifications';
import { AuthContext } from '../../context/AuthContext';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddBuilding from './buildings/AddBuilding';

type Building = { name: string; address: string; responsible: string; _id: string};

function Buildings() {

  // Accès au contexte, en vérifiant qu'il est bien défini
  const authContext = useContext(AuthContext);

  console.log("AuthContext in Buildings:", authContext);  // Vérifie si le contexte est disponible

  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { accessToken, refreshAccessToken } = authContext;

  const [data, setData] = useState<Building[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [isRefetching, setIsRefetching] = useState(false);
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const handleError = (message: string) => {
    showNotification({ title: 'Erreur', message, color: 'red' });
  };

  // Fonction pour charger les données des utilisateurs
  const fetchData = async () => {
    if (!accessToken) {
      console.error('No access token available');
      return;
    }

    try {
      const url = new URL(`${baseUrl}/buildings`);
      url.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`);
      url.searchParams.set('size', `${pagination.pageSize}`);
      url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
      url.searchParams.set('globalFilter', globalFilter ?? '');
      url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken.trim()}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include', 
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log('Token expired, trying to refresh...');
          await refreshAccessToken(); // Rafraîchir le token si expiré
          return fetchData(); // Relancer la requête avec le nouveau token
        }
        throw new Error('Erreur de chargement des batiments');
      }

      const result = await response.json();
      setData(result.buildings); 
      setRowCount(result.totalResults);
    } catch (error) {
      setIsError(true);
      handleError('Échec du chargement des batiments');
      console.error('Error loading buildings:', error);
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    document.title = 'Manage Buildings';
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, pagination, columnFilters, globalFilter, sorting]);

//TEMP TO ANALYSE
const handleDelete = async (name: string, id:string) => {
  if (!accessToken) {
    console.error('No access token available');
    return;
  }

  const confirm = window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`);
  if (!confirm) return;

  try {
    const response = await fetch(`${baseUrl}/buildings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken.trim()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log('Token expired, trying to refresh...');
        await refreshAccessToken();
        return handleDelete(name, id); // Relancer avec un token rafraîchi
      }
      throw new Error('Erreur lors de la suppression');
    }

    showNotification({
      title: 'Succès',
      message: `"${name}" a été supprimé.`,
      color: 'green',
    });

    // Actualisez la table après suppression
    setData((prev) => prev.filter((building) => building.name !== name));
  } catch (error) {
    handleError(`Échec de la suppression de "${name}".`);
    console.error('Error deleting building:', error);
  }
};



  const columns = useMemo<MRT_ColumnDef<Building>[]>(() => [
    { accessorKey: 'name', header: 'Nom du Batiment' },
    { accessorKey: 'address', header: 'Adresse' },
    { accessorKey: 'responsible', header: 'Responsable' },
    { accessorKey: '_id', header: 'Action', 
      Cell: ({ row }) => (
        <Button color='red' onClick={() => handleDelete(row.original.name,row.original._id )}>Delete</Button>
      )
    }
  ], []);

  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    getRowId: (row) => row.name,
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

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <MantineReactTable 
        table={table}
      />
      <Button variant="default" onClick={open}>
        Ajouter un Batiment
      </Button>

      <Modal opened={opened} onClose={close} title="Ajouter un Batiment" centered>
        <AddBuilding />
      </Modal>
    </div>
  );
}

export default Buildings;