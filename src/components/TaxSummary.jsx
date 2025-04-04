import React from 'react';

const borderClasses = 'border-b border-border px-4 py-2';
const textClasses = 'text-left text-muted-foreground';

const TaxSummary = ({ taxSummary }) => {
  return (
    <div className="overflow-x rounded-lg border border-border bg-card shadow-md dark:bg-card">
      <div className="py-4 px-2">
        <h2 className="text-lg font-semibold text-foreground">Tax Summary</h2>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th className={`${borderClasses} ${textClasses}`}>DESCRIPTION</th>
              <th className={`${borderClasses} ${textClasses}`}>TAX RATE</th>
              <th className={`${borderClasses} ${textClasses}`}>TAX BASE</th>
              <th className={`${borderClasses} ${textClasses}`}>TAX TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {taxSummary?.length > 0 ? (
              taxSummary.map((tax, index) => (
                <tr key={index}>
                  <td className={borderClasses}>{tax.description}</td>
                  <td className={borderClasses}>{tax.taxRate}</td>
                  <td className={borderClasses}>{tax.taxBase}</td>
                  <td className={borderClasses}>{tax.taxTotal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={`${borderClasses} text-center`}>
                  No tax information available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxSummary;
