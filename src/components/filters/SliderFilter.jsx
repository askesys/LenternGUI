export function SliderFilter({id, min=0, max, value, onChange, children}){
    
    
    return(
        <div>
            <label htmlFor={id}>{children}</label>
            <input type="range" name={id.charAt(0).toUpperCase() + id.slice(1)} id={id} min={min} max={max} value={value} onChange={onChange}/>
        </div>
    )
}