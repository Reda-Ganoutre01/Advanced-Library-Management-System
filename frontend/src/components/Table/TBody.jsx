import { FaEdit, FaTrash } from "react-icons/fa";
import { getImgUrl } from "../../utils/getImgUrl";
import DropItem from "./DropItem";

export function TBody({ data, columns, editLine, dropLine }) {
  const handleDelete = (id) => {
    dropLine(id);
  };

  return (
    <tbody>
      {data.map((line) => (
        <tr key={line["id"]} className="border-b hover:bg-gray-100">
          {columns.map((column) => (
            <td key={column} className="px-4 py-2 text-center">
              {column === "cover" ? (
                <img
                  src={getImgUrl(line[column]) || "/default-cover.jpg"}
                  alt="Book Cover"
                  className="w-16 h-20 object-cover rounded shadow"
                  onError={(e) => (e.target.src = "/default-cover.jpg")} // Fallback image if URL is broken
                />
              ) : (
                line[column]
              )}
            </td>
          ))}
          <td className="px-4 py-2 flex items-center space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => editLine(line["id"])}
            >
              <FaEdit className="inline-block mr-2" />
              Edit
            </button>
            <DropItem onDelete={() => handleDelete(line["id"])} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
