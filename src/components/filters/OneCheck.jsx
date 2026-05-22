export function OneCheck({ group, title, checked, onChange }) {
    return (
        <label>
            <input
                type="checkbox"
                name={group}
                checked={checked}
                onChange={onChange}
            />
            {title}
        </label>
    );
}