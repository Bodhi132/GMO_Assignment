import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Backdrop,CircularProgress } from '@mui/material';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'userId', headerName: 'User ID', width: 130 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'body', headerName: 'Body', width: 600 },
];

const TableView = () => {

  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  if (isLoading) {
    return (
      <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    )
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} initialState={{
        pagination: {
          paginationModel: { pageSize: 50, page: 0 },
        },
      }} />
    </div>
  )
}

export default TableView