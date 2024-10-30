import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

interface Entity {
  name: string;
  url: string;  // Добавим URL для получения ID
}

interface EntityTableProps {
  endpoint: string;  
}

const EntityTable: React.FC<EntityTableProps> = ({ endpoint }) => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/${endpoint}/?page=${page}`);
        const data = await response.json();
        setEntities(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [endpoint, page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, index) => {
            // Извлекаем ID из URL
            const id = entity.url.split('/')[5]; // URL имеет формат: https://swapi.dev/api/people/1/
            return (
              <tr key={index}>
                <td>
                  <Link to={`/${endpoint}/${id}`} className="text-decoration-none">
                    {entity.name}
                  </Link> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button 
          onClick={handlePreviousPage} 
          className="btn btn-secondary" 
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          className="btn btn-secondary" 
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EntityTable;
