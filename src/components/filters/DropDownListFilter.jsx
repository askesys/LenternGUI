

export function DropDownListFilter({title, id, options}){
    return(
        <div>
            <label htmlFor={id}>{title}</label>
            <select name={title} id={id}>
                {options.map(element => (
                    <option value={element} key={element}>
                        {element}
                    </option>
                ))}
            </select>
        </div>
    )
}