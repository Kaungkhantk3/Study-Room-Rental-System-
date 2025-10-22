import 'package:flutter/material.dart';
import 'loginscreen.dart'; 

class Lect extends StatefulWidget {
  const Lect({super.key});

  @override
  _StaffState createState() => _StaffState();
}

class _StaffState extends State<Lect> with SingleTickerProviderStateMixin {
  String? selectedGenre;
  late TabController _tabController;

  final List<Map<String, String>> roomStatuses = [
    {'status': 'Free', 'color': 'grey'},
    {'status': 'Pending', 'color': 'grey'},
    {'status': 'In Use', 'color': 'grey'},
    {'status': 'Disabled', 'color': 'grey'}
  ];

  final List<Map<String, String>> roomRequests = [
    {
      'date': '23/10/2024',
      'time': '09:00 - 10:00',
      'roomSize': 'Large Size',
      'capacity': '20 people'
    },
    {
      'date': '23/10/2024',
      'time': '09:00 - 10:00',
      'roomSize': 'Large Size',
      'capacity': '20 people'
    },
    {
      'date': '23/10/2024',
      'time': '09:00 - 10:00',
      'roomSize': 'Large Size',
      'capacity': '20 people'
    }
  ];

  final List<Map<String, String>> historyRecords = [
    {
      'room': 'Study Room 1',
      'roomSize': 'Large Size',
      'capacity': '20 people',
      'date': '23/10/2024',
      'time': '09:00 - 10:00',
      'status': 'Approved',
      'image': 'assets/images/study_room.jpg'
    },
    {
      'room': 'Study Room 1',
      'roomSize': 'Large Size',
      'capacity': '20 people',
      'date': '23/10/2024',
      'time': '09:00 - 10:00',
      'status': 'Approved',
      'image': 'assets/images/study_room.jpg'
    }
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
    _tabController.addListener(() {
      if (_tabController.index == 4) {
        _showLogoutConfirmationDialog(context);
        _tabController.index = 0; 
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _showLogoutConfirmationDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirm Logout'),
          content: const Text('Are you sure you want to logout?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); 
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); 
                Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => const LoginScreen()),
                ); 
              },
              child: const Text('Confirm'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: Container(
        color: const Color.fromARGB(255, 34, 33, 31),
        child: TabBar(
          controller: _tabController,
          labelColor: const Color.fromARGB(255, 216, 162, 94),
          unselectedLabelColor: const Color.fromARGB(255, 255, 255, 255),
          indicatorColor: const Color.fromARGB(255, 216, 162, 94),
          tabs: const [
            Tab(icon: Icon(Icons.home), text: 'Room List'),
            Tab(icon: Icon(Icons.request_quote), text: 'Request'),
            Tab(icon: Icon(Icons.dashboard), text: 'Dashboard'),
            Tab(icon: Icon(Icons.history), text: 'History'),
            Tab(icon: Icon(Icons.logout), text: 'Logout'),
          ],
        ),
      ),
      body: SafeArea(
        child: Container(
          color: const Color.fromARGB(255, 216, 162, 94),
          child: TabBarView(
            controller: _tabController,
            children: [
              buildRoomListTab(),
              buildRequestsTab(),
              buildDashboardTab(),
              buildHistoryTab(),
              const Center(child: Text('Logout')),
            ],
          ),
        ),
      ),
    );
  }

  Widget buildRoomListTab() {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: DropdownButtonFormField<String>(
            value: selectedGenre,
            decoration: InputDecoration(
              filled: true,
              fillColor: const Color.fromARGB(255, 34, 33, 31),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8.0),
                borderSide: const BorderSide(
                  color: Color.fromARGB(255, 34, 33, 31),
                  width: 1,
                ),
              ),
            ),
            items: const [
              DropdownMenuItem(
                value: '08:00-10:00',
                child: Text(
                  'Select reservation time | 08:00-10:00',
                  style: TextStyle(color: Colors.white),
                ),
              ),
              DropdownMenuItem(
                value: '10:00-12:00',
                child: Text('10:00-12:00', style: TextStyle(color: Colors.white)),
              ),
              DropdownMenuItem(
                value: '12:00-02:00',
                child: Text('12:00-02:00', style: TextStyle(color: Colors.white)),
              ),
              DropdownMenuItem(
                value: '02:00-04:00',
                child: Text('02:00-04:00', style: TextStyle(color: Colors.white)),
              ),
            ],
            onChanged: (String? newValue) {
              setState(() {
                selectedGenre = newValue;
              });
            },
            dropdownColor: const Color.fromARGB(255, 34, 33, 31),
          ),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: roomStatuses.length,
            itemBuilder: (context, index) {
              final room = roomStatuses[index];
              final color = room['color'] == 'green'
                  ? Colors.green
                  : room['color'] == 'orange'
                      ? Colors.orange
                      : room['color'] == 'red'
                          ? Colors.red
                          : Colors.grey;

              return Card(
                margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                color: const Color.fromARGB(255, 34, 33, 31),
                child: ListTile(
                  leading: Image.asset(
                    'assets/images/study_room.jpg',
                    width: 80,
                    height: 80,
                    fit: BoxFit.cover,
                  ),
                  title: const Text(
                    'Study Room 1',
                    style: TextStyle(color: Colors.white),
                  ),
                  subtitle: const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Room size: Large Size',
                        style: TextStyle(color: Colors.white),
                      ),
                      Text(
                        'Capacity: 20 people',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                    decoration: BoxDecoration(
                      color: color,
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Text(
                      room['status']!,
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget buildRequestsTab() {
    return Container(
      color: const Color.fromARGB(255, 216, 162, 94),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'Request..',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 34, 33, 31),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: roomRequests.length,
              itemBuilder: (context, index) {
                final room = roomRequests[index];
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                  color: const Color.fromARGB(255, 34, 33, 31),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Image.asset(
                              'assets/images/study_room.jpg',
                              width: 80,
                              height: 80,
                              fit: BoxFit.cover,
                            ),
                            const SizedBox(width: 16.0),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Study Room 1',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    'Room size: ${room['roomSize']}',
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                  Text(
                                    'Capacity: ${room['capacity']}',
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                  Text(
                                    'Date: ${room['date']}',
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                  Text(
                                    'Time: ${room['time']}',
                                    style: const TextStyle(color: Colors.white),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color.fromARGB(255, 106, 156, 137),
                                foregroundColor: Colors.black,
                              ),
                              onPressed: () {},
                              child: const Text('Approve'),
                            ),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color.fromARGB(255, 160, 71, 71),
                                foregroundColor: Colors.black,
                              ),
                              onPressed: () {},
                              child: const Text('Decline'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget buildDashboardTab() {
    return Container(
      color: const Color(0xFFD8A25E),
      child: Column(
        children: [
          Card(
            color: const Color.fromARGB(255, 34, 33, 31),
            margin: const EdgeInsets.all(16.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Padding(
              padding: EdgeInsets.all(16.0),
              child: Text(
                'Dashboard',
                style: TextStyle(fontSize: 20, color: Colors.white),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: DropdownButtonFormField<String>(
              value: selectedGenre,
              decoration: InputDecoration(
                filled: true,
                fillColor: const Color.fromARGB(255, 34, 33, 31),  
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
              hint: const Text(
                "Select Time",
                style: TextStyle(color: Colors.white),  
              ),
              items: const [
                DropdownMenuItem(
                  value: '08:00-10:00',
                  child: Text('08:00-10:00', style: TextStyle(color: Colors.white)),  
                ),
                DropdownMenuItem(
                  value: '10:00-12:00',
                  child: Text('10:00-12:00', style: TextStyle(color: Colors.white)),  
                ),
                DropdownMenuItem(
                  value: '12:00-02:00',
                  child: Text('12:00-02:00', style: TextStyle(color: Colors.white)),  
                ),
                DropdownMenuItem(
                  value: '02:00-04:00',
                  child: Text('02:00-04:00', style: TextStyle(color: Colors.white)),  
                ),
              ],
              onChanged: (String? newValue) {
                setState(() {
                  selectedGenre = newValue;
                });
              },
              dropdownColor: const Color.fromARGB(255, 34, 33, 31),
            ),
          ),
          Expanded(
            child: GridView.count(
              crossAxisCount: 2,
              padding: const EdgeInsets.all(16.0),
              crossAxisSpacing: 16.0,
              mainAxisSpacing: 16.0,
              children: [
                dashboardCard('Free Rooms', '5', const Color.fromARGB(255, 238, 223, 122)),
                dashboardCard('Reserved Rooms', '3', const Color.fromARGB(255, 108, 158, 170)),
                dashboardCard('Pending Rooms', '4', Colors.grey),
                dashboardCard('Disabled Rooms', '2', const Color.fromARGB(255, 160, 71, 71)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget dashboardCard(String title, String count, Color color) {
    return Card(
      color: const Color.fromARGB(255, 34, 33, 31),  
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 18,
                color: color, 
              ),
            ),
            const SizedBox(height: 8),
            Text(
              count,
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildHistoryTab() {
    return Container(
      color: const Color.fromARGB(255, 34, 33, 31),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: Text(
              'History...',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 216, 162, 94),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: historyRecords.length,
              itemBuilder: (context, index) {
                final record = historyRecords[index];
                return Card(
                  color: Colors.grey[300],
                  margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                record['room']!,
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black,
                                ),
                              ),
                              const SizedBox(height: 8.0),
                              Text(
                                'Room size: ${record['roomSize']}',
                                style: const TextStyle(color: Colors.black),
                              ),
                              Text(
                                'Capacity: ${record['capacity']}',
                                style: const TextStyle(color: Colors.black),
                              ),
                              Text(
                                'Date: ${record['date']}',
                                style: const TextStyle(color: Colors.black),
                              ),
                              Text(
                                'Time: ${record['time']}',
                                style: const TextStyle(color: Colors.black),
                              ),
                              Text(
                                'Status: ${record['status']}',
                                style: const TextStyle(color: Colors.black),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 16.0),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.asset(
                            record['image']!,
                            width: 100,
                            height: 80,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
