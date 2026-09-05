import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

function ProfileSettingsPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    preferred_font: 'font-arabic-body',
    preferred_theme: 'theme-sepia',
    font_size: 24,
    show_harakat: true,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        email: profile.email || user?.email || '',
        preferred_font: profile.preferred_font || 'font-arabic-body',
        preferred_theme: profile.preferred_theme || 'theme-sepia',
        font_size: profile.font_size || 24,
        show_harakat: profile.show_harakat ?? true,
      });
    }
  }, [profile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          preferred_font: formData.preferred_font,
          preferred_theme: formData.preferred_theme,
          font_size: formData.font_size,
          show_harakat: formData.show_harakat,
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      setMessage('Profil berhasil diperbarui');
    } catch (error) {
      setMessage('Gagal memperbarui profil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-center py-12 font-body-sm text-body-sm text-on-surface-variant">
        Memuat profil...
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-lg">
        Pengaturan Profil
      </h2>

      {message && (
        <div className={`mb-space-sm p-space-sm rounded-lg font-ui-caption text-ui-caption ${
          message.includes('berhasil')
            ? 'bg-primary-fixed text-on-primary-fixed'
            : 'bg-error-container text-on-error'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-space-md">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            Informasi Dasar
          </h3>
          <div className="space-y-space-sm">
            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm text-on-surface border border-outline focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 bg-surface-container-high rounded-lg font-body-sm text-body-sm text-on-surface-variant border border-outline cursor-not-allowed"
              />
              <p className="font-ui-caption text-ui-caption text-on-surface-variant mt-1">
                Email tidak dapat diubah dari sini
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-space-sm">
            Preferensi Pembaca
          </h3>
          <div className="space-y-space-sm">
            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Font Arab
              </label>
              <select
                value={formData.preferred_font}
                onChange={(e) => setFormData({ ...formData, preferred_font: e.target.value })}
                className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm text-on-surface border border-outline focus:outline-none focus:border-primary"
              >
                <option value="font-arabic-body">Amiri</option>
                <option value="font-arabic-body-scheherazade">Scheherazade New</option>
                <option value="font-display-hero">Noto Serif</option>
              </select>
            </div>
            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Ukuran Font: {formData.font_size}px
              </label>
              <input
                type="range"
                min="18"
                max="36"
                value={formData.font_size}
                onChange={(e) => setFormData({ ...formData, font_size: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-harakat"
                checked={formData.show_harakat}
                onChange={(e) => setFormData({ ...formData, show_harakat: e.target.checked })}
                className="w-4 h-4 rounded border-outline text-primary focus:ring-primary"
              />
              <label htmlFor="show-harakat" className="font-ui-caption text-ui-caption text-on-surface">
                Tampilkan Harakat / Tashkeel
              </label>
            </div>
            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Tema
              </label>
              <div className="flex gap-2">
                {[
                  { value: 'theme-light', label: 'Terang' },
                  { value: 'theme-sepia', label: 'Sepia' },
                  { value: 'theme-night', label: 'Malam' },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferred_theme: theme.value })}
                    className={`flex-1 py-2 px-3 rounded-lg font-ui-label text-ui-label transition-colors ${
                      formData.preferred_theme === theme.value
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-primary text-on-primary rounded-lg font-ui-label text-ui-label hover:bg-primary-container transition-colors disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSettingsPage;
