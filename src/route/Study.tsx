import './Study.scss';
import { useQuery } from '@apollo/client';
import { ALL_SUBJECTS } from '../utils/graphqlRequest';

export default function Study() {
  const { loading, error, data } = useQuery(ALL_SUBJECTS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <h1>Mes matières</h1>
      <div className="subject-list">
        {data?.subjects.map((element: any) => (
          <div
            data-testid={element.id}
            className="subject-element"
            key={element.id}
          >
            <img src={element.imageUrl} alt={element.name} />
            <button type="button" className="buttons subject-buttons">
              {element.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
