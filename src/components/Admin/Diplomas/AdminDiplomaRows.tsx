import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { DiplomaCardType } from "../../Diplomas/DiplomaCard";
interface Props {
  handleDelete: (id: string, img: string) => void;
  diplomas: DiplomaCardType[];
}

const AdminDiplomaRows: FC<Props> = ({ diplomas, handleDelete }) => {
  return (
    <ul className="list-unstyled mt-4">
      {diplomas.length < 1 ? (
        <h3 className="text-center">There are no diplomas</h3>
      ) : (
        diplomas.map((diploma) => (
          <div key={diploma._id}>
            <div className="my-3 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={diploma.main_img} alt={diploma.name.EN} width="150" />
                <div>
                  <h5>{diploma.name.EN}</h5>
                </div>
              </div>
              <div>
                <Link
                  title="Preview"
                  to={`/diplomas/${diploma._id}`}
                  target="_blank">
                  <FontAwesomeIcon
                    className="text-secondary-color fs-5"
                    icon={faEye}
                  />
                </Link>
                <Link title="Edit" to={diploma._id} className="mx-4">
                  <FontAwesomeIcon
                    className="text-secondary-color fs-5"
                    icon={faPenToSquare}
                  />
                </Link>
                <span
                  onClick={() => handleDelete(diploma._id, diploma.main_img)}
                  role="button"
                  title="Delete">
                  <FontAwesomeIcon
                    className="text-secondary-color fs-5"
                    icon={faTrash}
                  />
                </span>
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
    </ul>
  );
};

export default AdminDiplomaRows;
