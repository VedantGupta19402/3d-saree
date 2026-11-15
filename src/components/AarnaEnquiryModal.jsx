// AARNA — Private Atelier Consultation & Bespoke Appointment Modal

import { useState } from 'react'
import { useCloset } from '../store/useCloset'

export default function AarnaEnquiryModal() {
  const isEnquiryOpen = useCloset((s) => s.isEnquiryOpen)
  const toggleEnquiry = useCloset((s) => s.toggleEnquiry)
  const bag = useCloset((s) => s.bag)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    salon: 'New Delhi — The Dhan Mill',
    date: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  if (!isEnquiryOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    toggleEnquiry(false)
    setSubmitted(false)
  }

  return (
    <div className="enquiry-modal" role="dialog" aria-modal="true" aria-label="Atelier Consultation Request">
      <div className="enquiry-modal__backdrop" onClick={handleClose} />

      <div className="enquiry-modal__card" data-lenis-prevent>
        <button
          className="enquiry-modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className="enquiry-modal__success">
            <span className="enquiry-success__icon">✦</span>
            <h3 className="enquiry-success__title">Appointment Request Received</h3>
            <p className="enquiry-success__body">
              Thank you, {form.name || 'esteemed guest'}. Our Senior Atelier Concierge will
              contact you via {form.email || 'your email'} within four hours to confirm your private
              consultation and arrange personalized fabric swatches.
            </p>
            <button className="btn btn--solid" onClick={handleClose}>
              Return to Gallery
            </button>
          </div>
        ) : (
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="enquiry-form__head">
              <span className="eyebrow">Private Atelier Services</span>
              <h3 className="enquiry-form__title">Schedule a Consultation</h3>
              <p className="enquiry-form__sub">
                Experience bespoke made-to-measure tailoring, personal fabric consultations,
                or bridal commissions with our senior design team.
              </p>
            </div>

            {bag.length > 0 && (
              <div className="enquiry-form__bag-summary">
                <span className="bag-summary-label">Inquiring regarding items in your Atelier Bag:</span>
                <span className="bag-summary-list">
                  {bag.map((b) => `${b.name} (${b.color})`).join(' · ')}
                </span>
              </div>
            )}

            <div className="enquiry-form__fields">
              <div className="form-group">
                <label className="form-label" htmlFor="client-name">Full Name *</label>
                <input
                  id="client-name"
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Maharani Gayatri / Ananya Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="client-email">Email Address *</label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="client@luxury.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="client-phone">Phone / WhatsApp *</label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="salon-choice">Preferred Atelier Salon</label>
                  <select
                    id="salon-choice"
                    className="form-select"
                    value={form.salon}
                    onChange={(e) => setForm({ ...form, salon: e.target.value })}
                  >
                    <option value="New Delhi — The Dhan Mill">New Delhi — The Dhan Mill Salon</option>
                    <option value="Mumbai — Kala Ghoda">Mumbai — Kala Ghoda Private Studio</option>
                    <option value="London — Mayfair">London — Mayfair Private Suite</option>
                    <option value="Virtual Concierge Consultation">Virtual Video Concierge</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pref-date">Preferred Date</label>
                  <input
                    id="pref-date"
                    type="date"
                    className="form-input"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="client-notes">Special Requests / Measurement Details</label>
                <textarea
                  id="client-notes"
                  rows={3}
                  className="form-textarea"
                  placeholder="Specify custom silhouette preferences, event dates, or bridal requirements..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="enquiry-form__footer">
              <button type="submit" className="btn btn--solid btn--wide">
                Submit Private Request
              </button>
              <p className="enquiry-form__privacy">
                Your private details remain strictly confidential under our Atelier Privacy Protocol.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

