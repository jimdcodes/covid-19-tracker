import React from 'react'

function Table({ countries }) {
  return (
    <div className="table">
        {countries.map(({country, cases}) => ( //Go through all countries, map through them. For every single countries, return the following
            <tr>
                <td>{country}</td>
                <td><strong>{cases}</strong></td>
            </tr>
        ))}
    </div>
  )
}

export default Table