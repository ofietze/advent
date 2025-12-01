use clap::Parser;

#[derive(Parser)]
struct Cli {
    path: std::path::PathBuf,
}

fn main() {
    let args = Cli::parse();
    let content = std::fs::read_to_string(&args.path).expect("Could not read file");
    
    let mut lock_position = 50u8;
    let mut times_on_zero = 0u16;
    for line in content.lines() {
        let turn = (line[1..].parse::<u16>().expect("Not a valid u16") % 100) as u8;
        if line.contains('R') {
            lock_position = lock_position + turn;
            if lock_position >= 100 {
                lock_position = lock_position - 100
            }
        }
        if line.contains('L') {
            if turn > lock_position {
                lock_position = 100 + lock_position - turn;
            } else {
                lock_position = lock_position - turn;
            }
        }

        if lock_position == 0 {
            times_on_zero += 1;
        }
    }
    println!("The password is {}", times_on_zero);
}
