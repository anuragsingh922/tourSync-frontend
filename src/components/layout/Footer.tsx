const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TourSync. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;