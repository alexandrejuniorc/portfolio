import { clients } from '@/content/clients'
import { order } from '@/lib/style'
import { m } from '@/paraglide/messages'

/** A real table without lines. The column headings are for assistive technology only. */
export function Clients() {
  return (
    <section id="clients" className="section-pad">
      <div className="wrap">
        <h2 className="t-heading" data-reveal>
          {m.clients_heading()}
        </h2>
        <table className="clients-table mt-12" data-reveal style={order(1)}>
          <thead className="sr-only">
            <tr>
              <th scope="col">{m.clients_col_client()}</th>
              <th scope="col">{m.clients_col_work()}</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <th scope="row" className="t-lead font-display font-bold md:w-1/4" translate="no">
                  {client.name}
                </th>
                <td>{client.work()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
