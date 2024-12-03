import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

export default function AutoCompleteDropDown({ items,placeHolder }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);

    const searchItems = (event) => {
        let query = event.query.toLowerCase();
        let _filteredItems = [];

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.name.toLowerCase().includes(query)) {
                _filteredItems.push({ label: item.name, value: item.id });
            }
        }

        setFilteredItems(_filteredItems);
    }

    return (
        <AutoComplete 
            value={selectedItem} 
            suggestions={filteredItems} 
            completeMethod={searchItems}
            virtualScrollerOptions={{ itemSize: 38 }} 
            field="label" 
            dropdown 
            placeholder={placeHolder}
            onChange={(e) => setSelectedItem(e.value)} 
        />
    );
}
