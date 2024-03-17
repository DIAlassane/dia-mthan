import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ page, setPage, itemsPerPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    console.log('Page changed to:', value);
    setPage(value);
  };

  return (
    <Stack spacing={2} 
    sx={{ 
        justifyContent: 'center', 
        marginTop: '1rem',
        alignItems: 'center',
    }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Stack>
  );
};

export default CustomPagination;
