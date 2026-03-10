import { Plus, Trash2 } from 'lucide-react'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

function SmallActionButton({ children, onClick, variant = 'add' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${variant === 'add'
                    ? 'bg-brand-50 text-brand-700 border border-brand-100 hover:bg-brand-100'
                    : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
                }`}
        >
            {children}
        </button>
    )
}

function ToggleCard({ active, title, subtitle, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-[18px] border p-4 text-left transition ${active
                    ? 'border-brand-600 bg-brand-50 shadow-[0_8px_20px_rgba(223,62,116,0.12)]'
                    : 'border-rose-200 bg-white hover:bg-rose-50'
                }`}
        >
            <p className={`font-semibold ${active ? 'text-brand-700' : 'text-slate-900'}`}>
                {title}
            </p>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </button>
    )
}

export default function ProductForm({ values, setValues, onSubmit }) {
    const updateField = (key, value) => {
        setValues((prev) => ({ ...prev, [key]: value }))
    }

    const updateWeightPrice = (index, key, value) => {
        setValues((prev) => ({
            ...prev,
            weightPrices: prev.weightPrices.map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            )
        }))
    }

    const addWeightPrice = () => {
        setValues((prev) => ({
            ...prev,
            weightPrices: [...prev.weightPrices, { weight: '', price: '' }]
        }))
    }

    const removeWeightPrice = (index) => {
        setValues((prev) => ({
            ...prev,
            weightPrices: prev.weightPrices.filter((_, i) => i !== index)
        }))
    }

    const updateListItem = (field, index, value) => {
        setValues((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) => (i === index ? value : item))
        }))
    }

    const addListItem = (field) => {
        setValues((prev) => ({
            ...prev,
            [field]: [...prev[field], '']
        }))
    }

    const removeListItem = (field, index) => {
        setValues((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    return (
        <section>
            <div className="grid md:grid-cols-2 gap-4">
                <Input
                    label="Product Name"
                    value={values.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Classic Chocolate Birthday Cake"
                />

                <Input
                    label="Category"
                    value={values.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    placeholder="Birthday Cakes"
                />

                <Input
                    label="Base Price"
                    value={values.basePrice}
                    onChange={(e) => updateField('basePrice', e.target.value)}
                    placeholder="699"
                />

                <Input
                    label="Image URL"
                    value={values.image}
                    onChange={(e) => updateField('image', e.target.value)}
                    placeholder="https://..."
                />

                <div className="md:col-span-2">
                    <Textarea
                        label="Description"
                        value={values.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        placeholder="Rich chocolate sponge with creamy frosting..."
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
                <ToggleCard
                    active={values.available}
                    title={values.available ? 'Live Product' : 'Marked Sold Out'}
                    subtitle={
                        values.available
                            ? 'Customers can order this product'
                            : 'This product will show as sold out on the storefront'
                    }
                    onClick={() => updateField('available', !values.available)}
                />

                <ToggleCard
                    active={values.bestseller}
                    title="Bestseller"
                    subtitle="Highlight this product in the storefront"
                    onClick={() => updateField('bestseller', !values.bestseller)}
                />
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-4 gap-4">
                    <h4 className="text-xl font-semibold text-slate-900">Weights & Prices</h4>
                    <SmallActionButton onClick={addWeightPrice}>
                        <Plus size={16} />
                        Add Weight
                    </SmallActionButton>
                </div>

                <div className="space-y-3">
                    {values.weightPrices.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3">
                            <Input
                                label={index === 0 ? 'Weight' : ''}
                                value={item.weight}
                                onChange={(e) => updateWeightPrice(index, 'weight', e.target.value)}
                                placeholder="1/2 kg"
                            />
                            <Input
                                label={index === 0 ? 'Price' : ''}
                                value={item.price}
                                onChange={(e) => updateWeightPrice(index, 'price', e.target.value)}
                                placeholder="699"
                            />
                            <div className="flex items-end">
                                <SmallActionButton variant="delete" onClick={() => removeWeightPrice(index)}>
                                    <Trash2 size={16} />
                                </SmallActionButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-4 gap-4">
                    <h4 className="text-xl font-semibold text-slate-900">Flavours</h4>
                    <SmallActionButton onClick={() => addListItem('flavours')}>
                        <Plus size={16} />
                        Add Flavour
                    </SmallActionButton>
                </div>

                <div className="space-y-3">
                    {values.flavours.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_auto] gap-3">
                            <Input
                                label={index === 0 ? 'Flavour' : ''}
                                value={item}
                                onChange={(e) => updateListItem('flavours', index, e.target.value)}
                                placeholder="Chocolate"
                            />
                            <div className="flex items-end">
                                <SmallActionButton variant="delete" onClick={() => removeListItem('flavours', index)}>
                                    <Trash2 size={16} />
                                </SmallActionButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-4 gap-4">
                    <h4 className="text-xl font-semibold text-slate-900">Egg Types</h4>
                    <SmallActionButton onClick={() => addListItem('eggTypes')}>
                        <Plus size={16} />
                        Add Type
                    </SmallActionButton>
                </div>

                <div className="space-y-3">
                    {values.eggTypes.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_auto] gap-3">
                            <Input
                                label={index === 0 ? 'Type' : ''}
                                value={item}
                                onChange={(e) => updateListItem('eggTypes', index, e.target.value)}
                                placeholder="Eggless"
                            />
                            <div className="flex items-end">
                                <SmallActionButton variant="delete" onClick={() => removeListItem('eggTypes', index)}>
                                    <Trash2 size={16} />
                                </SmallActionButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="mt-8" onClick={onSubmit}>
                Save Product
            </Button>
        </section>
    )
}