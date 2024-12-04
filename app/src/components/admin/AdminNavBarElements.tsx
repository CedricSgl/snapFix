import { Skeleton } from "@mantine/core";

export function AdminNavBarElements(){
    return (
        <div>
            Navbar
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
        </div>
    )
}