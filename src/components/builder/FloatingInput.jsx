/**
 * Floating-label input/textarea.
 * @param {{label:string, value:string, onChange:(v:string)=>void, type?:string, placeholder?:string, textarea?:boolean, rows?:number}} props
 */
export default function FloatingInput({
  label, value, onChange, type = "text", placeholder = " ", textarea = false, rows = 3,
}) {
  return (
    <div className="field">
      {textarea ? (
        <textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      <label>{label}</label>
    </div>
  );
}
