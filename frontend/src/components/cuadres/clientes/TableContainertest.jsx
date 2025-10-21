const TableContainertest = ({ title, data, columns }) => {
  const getValue = (row, key) => key.split('.').reduce((obj, k) => obj?.[k], row);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, index) => (
              <th key={index} className="border border-gray-200 px-4 py-2 text-left capitalize">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row._id || rowIndex} className="border border-gray-200">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border border-gray-200 px-4 py-2">
                  {col.render
                    ? col.render(row) // 👈 si existe render, lo usamos
                    : getValue(row, col.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainertest;