export function SliderFilter({id, min=0, max, value, onChange, children}){
    return(
        <div>
            <div className="slider-label-row">
                <label htmlFor={id}>{children}</label>
                <span className="slider-value">{Number(value) === 0 ? "Any" : value}</span>
            </div>
            <input type="range" name={id.charAt(0).toUpperCase() + id.slice(1)} id={id} min={min} max={max} value={value} onChange={onChange}/>
        </div>
    )
}