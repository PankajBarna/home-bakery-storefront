import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

export default function EntityForm({ title, fields, values, onChange, onSubmit }) {
  return (
    <section className={title ? 'card p-5 md:p-6' : ''}>
      {title ? (
        <h3 className="font-heading text-3xl text-slate-900 mb-5">{title}</h3>
      ) : null}

      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((field) =>
          field.type === 'textarea' ? (
            <div key={field.name} className="md:col-span-2">
              <Textarea
                label={field.label}
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder || ''}
              />
            </div>
          ) : (
            <Input
              key={field.name}
              label={field.label}
              value={values[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
            />
          )
        )}
      </div>

      <Button className="mt-5" onClick={onSubmit}>
        Save
      </Button>
    </section>
  )
}