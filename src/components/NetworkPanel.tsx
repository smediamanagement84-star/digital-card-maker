import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { Users, Trash2, ExternalLink, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import Skeleton from './Skeleton';

interface Props { uid: string; }

interface Connection {
  id: string;
  connected_card_id: string;
  slug?: string;
  name?: string;
  title?: string;
  company?: string;
  university?: string;
  email?: string;
  mobile?: string;
  created_at?: string;
  card?: {
    slug: string;
    name: string;
    title: string;
    company: string;
    university: string;
    email: string;
    mobile: string;
  };
}

export default function NetworkPanel({ uid }: Props) {
  const [items, setItems] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const load = async () => {
      try {
        const { data: connections, error } = await supabase
          .from('network_connections')
          .select(`
            id,
            connected_card_id,
            created_at,
            notes,
            card:cards!network_connections_connected_card_id_fkey (
              slug,
              name,
              title,
              company,
              university,
              email,
              mobile
            )
          `)
          .eq('user_id', uid)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(connections || []);
      } catch (err) {
        console.error('Load connections', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [uid]);

  const remove = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('network_connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;
      setItems(prev => prev.filter(i => i.id !== connectionId));
    } catch (err) {
      console.error('Remove connection error:', err);
    }
  };

  const fmtDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <section className="glass rounded-3xl p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">
            <Users className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">My network</h3>
            <p className="text-xs text-white/50">People you've added from scanning their cards.</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/70">
          {items.length}
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" rounded="2xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-12 text-center space-y-2">
          <div className="text-4xl mb-2">🌱</div>
          <div className="text-sm text-white font-semibold">Your network grows as you scan.</div>
          <p className="text-xs text-white/50 max-w-md mx-auto leading-relaxed">
            Scan or open another CardChemy card while signed in and tap <span className="text-[var(--accent)] font-semibold">Add to my network</span> — they'll appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((c, i) => {
            const card = Array.isArray(c.card) ? c.card[0] : c.card;
            if (!card) return null;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-white font-semibold truncate">{card.name}</div>
                    {(card.title || card.company || card.university) && (
                      <div className="text-xs text-white/50 truncate mt-0.5">
                        {[card.title, card.company || card.university].filter(Boolean).join(' · ')}
                      </div>
                    )}
                  </div>
                  <button onClick={() => remove(c.id)} title="Remove" className="text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/50 mt-1">
                  {card.email && <a href={`mailto:${card.email}`} className="inline-flex items-center gap-1 hover:text-[var(--accent)]"><Mail className="w-3 h-3" /> Email</a>}
                  {card.mobile && <a href={`tel:${card.mobile}`} className="inline-flex items-center gap-1 hover:text-[var(--accent)]"><Phone className="w-3 h-3" /> Call</a>}
                  {c.created_at && <span className="inline-flex items-center gap-1 ml-auto"><Calendar className="w-3 h-3" /> {fmtDate(c.created_at)}</span>}
                  <Link to={`/d/${card.slug}`} className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"><ExternalLink className="w-3 h-3" /> View</Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
