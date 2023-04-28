import torch
import torch.nn as nn


class SequenceEncoder(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, bidirectional=False):
        super(SequenceEncoder, self).__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.bidirectional = bidirectional
        self.num_directions = 2 if bidirectional else 1
        self.rnn = nn.GRU(input_size, hidden_size, num_layers, batch_first=True, bidirectional=bidirectional)

    def forward(self, x):
        # x: batch_size x seq_len x input_size
        h0 = torch.zeros(self.num_layers * self.num_directions, x.size(0), self.hidden_size)
        if torch.cuda.is_available():
            h0 = h0.cuda()
        _, hn = self.rnn(x, h0)
        # hn: num_layers*num_directions x batch_size x hidden_size
        if self.bidirectional:
            hn = torch.cat((hn[-2], hn[-1]), dim=1)
        else:
            hn = hn[-1]
        # hn: batch_size x (num_directions * hidden_size)
        return hn


# example usage
seq1 = torch.tensor([[1, 2, 4, 5, 6, 7], [1, 2, 4, 5, 6, 7]])
seq2 = torch.tensor([[100, 3, 5], [1, 4, 7]])
encoder = SequenceEncoder(input_size=1, hidden_size=16, num_layers=2, bidirectional=True)
if torch.cuda.is_available():
    encoder.cuda()
seq1_encoding = encoder(seq1.unsqueeze(2).float())
seq2_encoding = encoder(seq2.unsqueeze(2).float())
distance = nn.functional.pairwise_distance(seq1_encoding, seq2_encoding)
print(distance.detach().numpy())
