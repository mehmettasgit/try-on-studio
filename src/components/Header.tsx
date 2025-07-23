/**
 * App header component with title and branding
 */

const Header = () => {
  return (
    <header className="bg-gradient-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-6">
          <h1 className="text-4xl xl:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Virtual Try-On
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;