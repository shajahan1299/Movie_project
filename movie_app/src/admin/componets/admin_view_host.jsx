import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { baseUrl } from '../../config/config';
import { toast, Toaster } from 'react-hot-toast';
import GoBackButton from '../../public/gobackButton';

function AdminViewHost() {


  
  const [blockReason, setBlockReason] = useState('');

  const hostsPerPage = 15;
  const [hosts, setHosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/getallhost`);
        setHosts(response.data);
        console.log(response.data);
        setRefresh(false);
      } catch (error) {
        console.error('Error fetching hosts:', error);
      }
    };
    fetchHosts();
  }, [refresh]);

  const ApproveHost = async (hostId, email, status) => {
    console.log(`Approve Host: ID-${hostId}, Email-${email}, Status-${status}`);

    try {
      const response = await axios.post(`${baseUrl}/api/block-user/${hostId}`, { email, status, reason: blockReason });
      setRefresh(true);
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error blocking user:', error);

      // Show an error toast when there's an error
      toast.error('Error blocking user', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const offset = currentPage * hostsPerPage;
  const currentHosts = hosts.slice(offset, offset + hostsPerPage);

  const pageCount = Math.ceil(hosts.length / hostsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div id="main">
      <div className="container mt-5 card" style={{ padding: '20px' }}>
        <h2>Host List</h2>
        <GoBackButton />
        <table className="table">
          <thead>
            <tr>
              <th>Host Name</th>
              <th>Host Email</th>
              <td>Status</td>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {currentHosts.map((host) => (
    <tr key={host._id}>
      <td>{host.hostname}</td>
      <td>{host.email}</td>
      <td style={{ color: host.status === 'blocked' ? 'red' : 'green' }}>
        {host.status}
      </td>
      <td>{host.contactNumber}</td>
      <td>
      {host.status === 'blocked' ? (
    <button
        type="button"
        className="btn btn-success"
        onClick={() => ApproveHost(host._id, host.email, 'Authorized')}
    >
        Approve
    </button>
) : host.status === 'Not-Verified' ? (
    <div>
        User Not Verified
    </div>
) : (
    <button
        type="button"
        className="btn btn-danger"
        onClick={() => ApproveHost(host._id, host.email, 'blocked')}
    >
        Block
    </button>
)}

      </td>
    </tr>
  ))}
</tbody>

        </table>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default AdminViewHost;
