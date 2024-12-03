import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

function MyDataTable() {
  useEffect(() => {
    $('#myTable').DataTable();
  }, []);

  return (
    <table id="myTable">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          {/* Add more column headers if needed */}
        </tr>
      </thead>
      <tbody>
        {/* Add table rows and data here */}
      </tbody>
    </table>
  );
}

export default MyDataTable;
