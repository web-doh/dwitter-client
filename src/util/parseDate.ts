export default function parseDate(tdate: string): string {
  const created = new Date(Date.parse(tdate));
  const now = new Date();
  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diff <= 1) {
    return "just now";
  }
  if (diff < 20) {
    return diff + " seconds ago";
  }
  if (diff < 40) {
    return "half a minute ago";
  }
  if (diff < 60) {
    return "less than a minute ago";
  }
  if (diff <= 90) {
    return "one minute ago";
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + " minutes ago";
  }
  if (diff <= 5400) {
    return "1 hour ago";
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + " hours ago";
  }
  if (diff <= 129600) {
    return "1 day ago";
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + " days ago";
  }
  if (diff <= 777600) {
    return "1 week ago";
  }

  const year = created.toLocaleDateString("default", {
    year: "numeric",
  });
  const currentYear = created.toLocaleDateString("default", {
    year: "numeric",
  });

  if (year === currentYear) {
    return created.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
    });
  }

  return created.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
