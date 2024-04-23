interface Props {
  user_idx: number;
}

export default function PhoneHeader({ user_idx }: Props) {
  if (user_idx >= 4)
    return (
      <section className="phone_header">
        <span>
          The Other<sup>{user_idx}</sup> You
        </span>
      </section>
    );

  return (
    <section className="phone_header">
      {user_idx > 0 && user_idx < 4
        ? 'The ' + 'Other '.repeat(user_idx) + 'You'
        : 'You'}
    </section>
  );
}
