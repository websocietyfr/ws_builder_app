import { Project, Task, Comment } from '../types';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  pdf 
} from '@react-pdf/renderer';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    width: '100%',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 10,
  },
  statusBadge: {
    backgroundColor: '#e5e7eb',
  },
  priorityBadge: {
    backgroundColor: '#dbeafe',
  }
});

const ProjectPDF = ({ project, tasks, comments }: { 
  project: Project; 
  tasks: Task[];
  comments: Comment[];
}) => (
  <Document>
    <Page>
      <View style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{project.name}</Text>
          <Text style={styles.text}>{project.description}</Text>
          <Text style={styles.text}>Status: {project.status}</Text>
          <Text style={styles.text}>
            Timeline: {format(new Date(project.startDate), 'MMM d, yyyy')} - 
            {format(new Date(project.endDate), 'MMM d, yyyy')}
          </Text>
          <Text style={styles.text}>Budget: ${project.budget.toLocaleString()}</Text>
          <Text style={styles.text}>Progress: {project.progress}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Tasks</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Title</Text>
              <Text style={styles.tableCell}>Status</Text>
              <Text style={styles.tableCell}>Priority</Text>
              <Text style={styles.tableCell}>Assignee</Text>
              <Text style={styles.tableCell}>Due Date</Text>
            </View>
            {tasks.map((task) => (
              <View key={task.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{task.title}</Text>
                <Text style={styles.tableCell}>{task.status}</Text>
                <Text style={styles.tableCell}>{task.priority}</Text>
                <Text style={styles.tableCell}>{task.assignee}</Text>
                <Text style={styles.tableCell}>
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Comments</Text>
          <View style={styles.table}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={[styles.text, { fontWeight: 'bold' }]}>{comment.author}</Text>
                  <Text style={styles.text}>{comment.content}</Text>
                  <Text style={[styles.text, { color: '#6b7280', fontSize: 10 }]}>
                    {format(new Date(comment.timestamp), 'MMM d, yyyy HH:mm')}
                  </Text>
                  {comment.attachments.length > 0 && (
                    <Text style={[styles.text, { color: '#6b7280', fontSize: 10 }]}>
                      Attachments: {comment.attachments.map(a => a.name).join(', ')}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export const generateProjectPDF = async (
  project: Project,
  tasks: Task[],
  comments: Comment[]
) => {
  try {
    // Generate the PDF blob
    const blob = await pdf(
      <ProjectPDF project={project} tasks={tasks} comments={comments} />
    ).toBlob();
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-report.pdf`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the PDF. Please try again.');
  }
};