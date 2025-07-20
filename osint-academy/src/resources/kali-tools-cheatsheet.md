# Kali Linux Tools Quick Reference Cheat Sheet

*Your pocket guide to essential OSINT tools in Kali Linux*

## Network Reconnaissance

### Nmap - Network Mapper
```bash
# Basic scan
nmap target_ip

# Scan specific ports
nmap -p 80,443,22 target_ip

# Scan port range
nmap -p 1-1000 target_ip

# Scan all ports
nmap -p- target_ip

# TCP SYN scan (stealth)
nmap -sS target_ip

# UDP scan
nmap -sU target_ip

# OS detection
nmap -O target_ip

# Service version detection
nmap -sV target_ip

# Aggressive scan (OS, version, scripts, traceroute)
nmap -A target_ip

# Script scan
nmap --script vuln target_ip

# Save output to file
nmap -oN output.txt target_ip
nmap -oX output.xml target_ip
```

### Masscan - High-Speed Port Scanner
```bash
# Basic scan
masscan -p80,443 target_ip

# Scan all ports
masscan -p1-65535 target_ip --rate=1000

# Scan subnet
masscan -p80 192.168.1.0/24 --rate=100

# Output to file
masscan -p80 target_ip -oG output.txt
```

### Dmitry - Information Gathering
```bash
# Full scan with all options
dmitry -winsepo output.txt target.com

# Options breakdown:
# -w: Whois lookup
# -i: IP whois lookup  
# -n: Netcraft search
# -s: Search for subdomains
# -e: Search for email addresses
# -p: Port scan
# -o: Output to file
```

### Fierce - Domain Scanner
```bash
# Basic domain scan
fierce -dns target.com

# Use custom wordlist
fierce -dns target.com -wordlist /path/to/wordlist.txt

# Scan specific range
fierce -range 192.168.1.1-192.168.1.100
```

## Web Application Analysis

### Dirb - Web Content Scanner
```bash
# Basic scan
dirb http://target.com

# Use custom wordlist
dirb http://target.com /usr/share/wordlists/dirb/common.txt

# Scan with extensions
dirb http://target.com -X .php,.html,.txt

# Use proxy
dirb http://target.com -p http://proxy:8080

# Save output
dirb http://target.com -o output.txt
```

### Nikto - Web Vulnerability Scanner
```bash
# Basic scan
nikto -h http://target.com

# Scan specific port
nikto -h target.com -p 8080

# Force SSL
nikto -h target.com -ssl

# Output to file
nikto -h target.com -o output.txt

# Specify format
nikto -h target.com -Format txt -o output.txt
```

### Whatweb - Website Fingerprinting
```bash
# Basic scan
whatweb target.com

# Aggressive scan
whatweb -a 3 target.com

# Scan multiple targets
whatweb -i targets.txt

# Output to file
whatweb target.com -l output.txt
```

## Information Gathering

### theHarvester - Email/Subdomain Harvesting
```bash
# Basic search
theHarvester -d target.com -l 500 -b google

# Multiple sources
theHarvester -d target.com -l 500 -b google,bing,linkedin

# Available sources:
# google, bing, yahoo, linkedin, twitter, googleplus
# shodan, baidu, censys, dogpile, netcraft

# Save results
theHarvester -d target.com -l 500 -b google -f output.html
```

### Recon-ng - Reconnaissance Framework
```bash
# Start recon-ng
recon-ng

# Inside recon-ng:
# Show available modules
modules search

# Load a module
modules load recon/domains-hosts/google_site_web

# Show module info
info

# Set options
options set SOURCE target.com

# Run module
run

# Show results
show hosts
```

### Maltego - Link Analysis
```bash
# Start Maltego (GUI application)
maltego

# Command line transform runner
maltego -transform TransformName -input "input_data"
```

## Network Analysis

### Wireshark - Network Protocol Analyzer
```bash
# Start Wireshark (GUI)
wireshark

# Command line version (tshark)
tshark -i eth0

# Capture to file
tshark -i eth0 -w capture.pcap

# Read from file
tshark -r capture.pcap

# Filter traffic
tshark -i eth0 -f "port 80"

# Display filter
tshark -r capture.pcap -Y "http"
```

### Tcpdump - Packet Capture
```bash
# Basic capture
tcpdump -i eth0

# Capture specific port
tcpdump -i eth0 port 80

# Capture and save to file
tcpdump -i eth0 -w capture.pcap

# Read from file
tcpdump -r capture.pcap

# Verbose output
tcpdump -i eth0 -v

# Don't resolve hostnames
tcpdump -i eth0 -n

# Show ASCII content
tcpdump -i eth0 -A
```

### Netstat - Network Statistics
```bash
# Show all connections
netstat -a

# Show listening ports
netstat -l

# Show TCP connections
netstat -t

# Show UDP connections
netstat -u

# Show process IDs
netstat -p

# Show routing table
netstat -r

# Continuous monitoring
netstat -c

# Common combinations
netstat -tuln  # TCP/UDP listening ports, no name resolution
netstat -anp   # All connections with process info
```

## Wireless Tools

### Aircrack-ng Suite
```bash
# Enable monitor mode
airmon-ng start wlan0

# Scan for networks
airodump-ng wlan0mon

# Capture specific network
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon

# Deauth attack
aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF wlan0mon

# Crack WEP
aircrack-ng capture-01.cap

# Crack WPA/WPA2
aircrack-ng -w wordlist.txt capture-01.cap
```

### Kismet - Wireless Network Detector
```bash
# Start Kismet
kismet

# Command line
kismet_server

# Configure interface
kismet -c wlan0
```

## Password and Database Tools

### John the Ripper - Password Cracker
```bash
# Basic crack
john password_hashes.txt

# Use wordlist
john --wordlist=/usr/share/wordlists/rockyou.txt password_hashes.txt

# Show cracked passwords
john --show password_hashes.txt

# Crack specific format
john --format=md5 hashes.txt

# Incremental mode
john --incremental password_hashes.txt
```

### Hydra - Network Login Cracker
```bash
# SSH brute force
hydra -l username -P passwords.txt target.com ssh

# HTTP basic auth
hydra -l admin -P passwords.txt target.com http-get /admin

# FTP brute force
hydra -L users.txt -P passwords.txt target.com ftp

# Multiple protocols
hydra -l user -p pass target.com ssh,ftp,telnet

# Web form attack
hydra -l admin -P passwords.txt target.com http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"
```

### SQLmap - SQL Injection Tool
```bash
# Basic test
sqlmap -u "http://target.com/page.php?id=1"

# Test with cookies
sqlmap -u "http://target.com/page.php" --cookie="PHPSESSID=abc123"

# Test POST data
sqlmap -u "http://target.com/login.php" --data="user=admin&pass=test"

# Enumerate databases
sqlmap -u "http://target.com/page.php?id=1" --dbs

# Enumerate tables
sqlmap -u "http://target.com/page.php?id=1" -D database_name --tables

# Dump table data
sqlmap -u "http://target.com/page.php?id=1" -D database_name -T table_name --dump
```

## Forensics Tools

### Autopsy - Digital Forensics
```bash
# Start Autopsy (web interface)
autopsy

# Access via browser: http://localhost:9999/autopsy
```

### Binwalk - Firmware Analysis
```bash
# Analyze file
binwalk firmware.bin

# Extract files
binwalk -e firmware.bin

# Entropy analysis
binwalk -E firmware.bin

# Signature scan
binwalk -B firmware.bin
```

### Foremost - File Carving
```bash
# Basic file carving
foremost -i disk_image.dd -o output_dir

# Specify file types
foremost -t jpg,png,pdf -i disk_image.dd -o output_dir

# Verbose output
foremost -v -i disk_image.dd -o output_dir
```

### Strings - Extract Text
```bash
# Basic strings extraction
strings binary_file

# Minimum string length
strings -n 10 binary_file

# Show file offsets
strings -o binary_file

# Scan entire file
strings -a binary_file
```

## Search and Analysis

### Google Dorking
```bash
# Site-specific search
site:target.com "confidential"

# File type search
filetype:pdf site:target.com

# Intitle search
intitle:"index of" site:target.com

# URL search
inurl:admin site:target.com

# Cache search
cache:target.com

# Related sites
related:target.com

# Exclude terms
"john smith" -actor

# Wildcard search
"john * smith"

# Date range (in Google web interface)
# Tools > Any time > Custom range
```

### Shodan Search Queries
```bash
# Basic service search
port:22

# Specific product
product:"Apache httpd"

# Country search
country:US

# City search
city:"New York"

# Organization search
org:"Google"

# Hostname search
hostname:example.com

# SSL certificate search
ssl:"example.com"

# Webcam search
product:"webcam"

# Default passwords
default password

# Combine queries
port:80 country:US city:"New York"
```

## File and Data Analysis

### Exiftool - Metadata Analysis
```bash
# View all metadata
exiftool image.jpg

# View specific tags
exiftool -GPS* image.jpg

# Remove metadata
exiftool -all= image.jpg

# Extract to text file
exiftool -t image.jpg > metadata.txt

# Batch process
exiftool *.jpg
```

### Hash Analysis
```bash
# MD5 hash
md5sum file.txt

# SHA1 hash
sha1sum file.txt

# SHA256 hash
sha256sum file.txt

# Compare hashes
md5sum file1.txt file2.txt

# Verify hash
echo "hash_value file.txt" | md5sum -c
```

## Useful Wordlists (Kali Linux)
```bash
# Common wordlists location
/usr/share/wordlists/

# Dirb wordlists
/usr/share/wordlists/dirb/

# SecLists (if installed)
/usr/share/seclists/

# RockYou password list
/usr/share/wordlists/rockyou.txt

# Common usernames
/usr/share/wordlists/metasploit/unix_users.txt

# Extract rockyou.txt
gunzip /usr/share/wordlists/rockyou.txt.gz
```

## Output and Logging

### Common Output Options
```bash
# Nmap outputs
-oN normal.txt    # Normal output
-oX scan.xml      # XML output
-oG grep.txt      # Greppable output
-oA basename      # All formats

# Redirect output
command > output.txt          # Redirect stdout
command 2> error.txt          # Redirect stderr  
command &> all_output.txt     # Redirect both
command | tee output.txt      # Display and save
```

### Screen and Tmux (Session Management)
```bash
# Screen
screen -S session_name        # Start named session
screen -r session_name        # Reattach to session
screen -ls                    # List sessions
Ctrl+A, D                     # Detach from session

# Tmux
tmux new -s session_name      # Start named session
tmux attach -t session_name   # Attach to session
tmux ls                       # List sessions
Ctrl+B, D                     # Detach from session
```

## Quick Setup Commands

### Update Kali
```bash
apt update && apt upgrade -y
apt dist-upgrade -y
```

### Install Additional Tools
```bash
# Install pip packages
pip install shodan
pip install censys
pip install requests beautifulsoup4

# Install additional wordlists
apt install seclists

# Install additional tools
apt install gobuster
apt install sublist3r
apt install amass
```

### Network Interface Management
```bash
# Show interfaces
ip addr show
ifconfig

# Bring interface up/down
ip link set eth0 up
ip link set eth0 down

# Set IP address
ip addr add 192.168.1.100/24 dev eth0

# Show routing table
ip route show
route -n
```

## Common Keyboard Shortcuts

### Terminal Shortcuts
```bash
Ctrl+C          # Kill current process
Ctrl+Z          # Suspend current process
Ctrl+L          # Clear screen
Ctrl+A          # Move to beginning of line
Ctrl+E          # Move to end of line
Ctrl+R          # Search command history
Tab             # Auto-complete
!!              # Repeat last command
!n              # Repeat command number n
```

### Vim/Vi Editor (for editing config files)
```bash
i               # Insert mode
Esc             # Command mode
:w              # Save file
:q              # Quit
:wq             # Save and quit
:q!             # Quit without saving
/search_term    # Search
dd              # Delete line
yy              # Copy line
p               # Paste
```

## Emergency Commands

### Process Management
```bash
# Show running processes
ps aux
top
htop

# Kill process by PID
kill PID
kill -9 PID     # Force kill

# Kill process by name
killall process_name
pkill process_name

# Show network connections
lsof -i
ss -tuln
```

### System Information
```bash
# System info
uname -a
lsb_release -a

# Disk usage
df -h
du -sh /path/

# Memory usage
free -h

# CPU info
lscpu
cat /proc/cpuinfo

# Network interfaces
ip addr
ifconfig -a
```

---

## Quick Reference Card

### Most Used Commands
| Tool | Command | Purpose |
|------|---------|---------|
| nmap | `nmap -A target` | Aggressive scan |
| dirb | `dirb http://target` | Directory scan |
| nikto | `nikto -h target` | Web vuln scan |
| theHarvester | `theHarvester -d domain -b google` | Email harvest |
| hydra | `hydra -l user -P pass.txt target ssh` | Brute force |
| john | `john --wordlist=rockyou.txt hashes` | Crack passwords |
| sqlmap | `sqlmap -u "url?id=1"` | SQL injection |
| wireshark | `wireshark` | Packet analysis |

### Essential File Locations
| Type | Location |
|------|----------|
| Wordlists | `/usr/share/wordlists/` |
| Scripts | `/usr/share/nmap/scripts/` |
| Config | `/etc/` |
| Logs | `/var/log/` |
| Home | `/home/kali/` |

### Common Ports
| Port | Service |
|------|---------|
| 21 | FTP |
| 22 | SSH |
| 23 | Telnet |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 110 | POP3 |
| 143 | IMAP |
| 443 | HTTPS |
| 993 | IMAPS |
| 995 | POP3S |

*Remember: Always use these tools ethically and legally. Only test systems you own or have explicit permission to test.*

