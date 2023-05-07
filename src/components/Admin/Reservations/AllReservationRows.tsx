import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
interface Props {
  handleDelete: (id: string) => void;
  list: [];
}

const AllReservationRows: FC<Props> = ({ list, handleDelete }) => {
  return (
    // <ul className="list-unstyled mt-4">
    //   {list.length < 1 ? (
    //     <h3 className="text-center">There are no Enrollments Yet</h3>
    //   ) : (
    //     list.map((item) => (
    //       <div key={item._id}>
    //         <div className="my-3">
    //           <h5>{item.name}</h5>
    //           <div>
    //             <span
    //               onClick={() => handleDelete(item._id)}
    //               role="button"
    //               title="Delete">
    //               <FontAwesomeIcon
    //                 className="text-secondary-color fs-5"
    //                 icon={faTrash}
    //               />
    //             </span>
    //           </div>
    //         </div>
    //         <hr />
    //       </div>
    //     ))
    //   )}
    // </ul>
    <></>
  );
};

export default AllReservationRows;
