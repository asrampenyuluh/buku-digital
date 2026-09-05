import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signUp(email, password, fullName);
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md">
          <div className="text-center mb-space-md">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              Daftar Akun Admin
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Buat akun baru untuk mengelola konten kitab
            </p>
          </div>

          {error && (
            <div className="mb-space-sm p-space-sm bg-error-container text-on-error rounded-lg font-ui-caption text-ui-caption">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-space-sm">
            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm text-on-surface border border-outline focus:outline-none focus:border-primary"
                placeholder="Nama Anda"
                required
              />
            </div>

            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm text-on-surface border border-outline focus:outline-none focus:border-primary"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block font-ui-caption text-ui-caption text-on-surface mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container rounded-lg font-body-sm text-body-sm text-on-surface border border-outline focus:outline-none focus:border-primary"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="font-ui-caption text-ui-caption text-on-surface-variant mt-1">
                Minimal 6 karakter
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-ui-label text-ui-label font-semibold hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {loading ? 'Memuat...' : 'Daftar'}
            </button>
          </form>

          <div className="mt-space-sm text-center">
            <Link to="/admin/login" className="font-ui-caption text-ui-caption text-primary hover:underline">
              ← Sudah punya akun? Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
